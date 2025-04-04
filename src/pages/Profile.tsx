
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, User, Camera, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, userProfile, refreshProfile } = useAuth();
  
  // Profile form state
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Load user profile data
  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || "");
      setAvatarUrl(userProfile.avatar_url || "");
    }
  }, [userProfile]);

  // Handle avatar file selection
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    setAvatarFile(file);
    
    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);
    
    // Clean up preview URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  };

  // Upload avatar to storage
  const uploadAvatar = async (userId: string, file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/avatar.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  };

  // Update user profile
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Bạn cần đăng nhập để cập nhật hồ sơ");
      return;
    }
    
    setIsLoading(true);
    
    try {
      let newAvatarUrl = avatarUrl;
      
      // Upload new avatar if selected
      if (avatarFile) {
        newAvatarUrl = await uploadAvatar(user.id, avatarFile);
      }
      
      // Update profile in database
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          avatar_url: newAvatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id);
        
      if (error) throw error;
      
      // Refresh profile data
      await refreshProfile();
      toast.success("Hồ sơ đã được cập nhật thành công");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Không thể cập nhật hồ sơ");
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-4">Bạn cần đăng nhập</h2>
        <Button onClick={() => navigate("/auth")}>Đăng nhập</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-3xl font-bold mb-6">Hồ sơ của bạn</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>
                Cập nhật thông tin và ảnh đại diện của bạn
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage 
                      src={avatarPreview || avatarUrl} 
                      alt={username || user?.email || "Avatar"} 
                    />
                    <AvatarFallback>
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex items-center">
                    <Label 
                      htmlFor="avatar-upload"
                      className="cursor-pointer flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80"
                    >
                      <Camera className="h-4 w-4" />
                      Thay đổi ảnh
                    </Label>
                    <Input 
                      id="avatar-upload"
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email" 
                    value={user.email} 
                    disabled 
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Không thể thay đổi email đã đăng ký
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Tên hiển thị</Label>
                  <Input 
                    id="username"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên hiển thị của bạn"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang cập nhật...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Lưu thông tin
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt</CardTitle>
              <CardDescription>
                Quản lý các tùy chọn và cài đặt cá nhân
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add settings like theme, notification preferences, etc. in the future */}
              <p className="text-center py-8 text-muted-foreground">
                Các tùy chọn cài đặt sẽ được cập nhật trong thời gian tới
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
