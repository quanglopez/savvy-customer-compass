
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<{
    error: any | null;
    success: boolean;
  }>;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    success: boolean;
  }>;
  signOut: () => Promise<void>;
  userProfile: any | null;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Lỗi khi tải hồ sơ người dùng:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Lỗi khi tải hồ sơ người dùng:", error);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const profile = await fetchUserProfile(user.id);
      setUserProfile(profile);
    }
  };

  useEffect(() => {
    console.log("Khởi tạo Auth Provider...");
    
    // Thiết lập listener cho trạng thái xác thực TRƯỚC
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Trạng thái xác thực thay đổi:', event, session?.user);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Tải hồ sơ người dùng nếu đã đăng nhập
        if (session?.user) {
          setTimeout(async () => {
            const profile = await fetchUserProfile(session.user.id);
            setUserProfile(profile);
          }, 0);
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
      }
    );

    // SAU ĐÓ kiểm tra phiên hiện tại
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Kiểm tra phiên ban đầu:', session?.user);
      setSession(session);
      setUser(session?.user ?? null);
      
      // Tải hồ sơ người dùng nếu đã đăng nhập
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        setUserProfile(profile);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      console.log("Đang thực hiện đăng ký với email:", email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: name ? {
          data: {
            name: name
          }
        } : undefined
      });

      if (error) {
        console.error("Lỗi đăng ký:", error);
        return { error, success: false };
      }

      toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");
      return { error: null, success: true };
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      return { error, success: false };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Đang thực hiện đăng nhập với email:", email);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Lỗi đăng nhập:", error);
        return { error, success: false };
      }

      console.log("Đăng nhập thành công:", data.user);
      toast.success("Đăng nhập thành công!");
      
      // Tải hồ sơ người dùng sau khi đăng nhập
      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);
        setUserProfile(profile);
      }
      
      return { error: null, success: true };
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      return { error, success: false };
    }
  };

  const signOut = async () => {
    try {
      console.log("Đang thực hiện đăng xuất...");
      await supabase.auth.signOut();
      setUserProfile(null);
      toast.success("Đã đăng xuất");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      toast.error("Lỗi khi đăng xuất");
    }
  };

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
    userProfile,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth phải được sử dụng trong AuthProvider");
  }
  return context;
}
