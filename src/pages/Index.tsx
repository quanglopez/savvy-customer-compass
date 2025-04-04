
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export function Index() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="bg-primary rounded-full p-4">
            <MessageSquare className="h-16 w-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Savvy Customer Compass
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Nền tảng quản lý và phân tích hội thoại chatbot toàn diện cho doanh nghiệp
        </p>
        
        <div className="space-y-4">
          <p className="text-lg mb-4">
            {loading ? 'Đang tải...' : (user ? 'Bạn đã đăng nhập' : 'Vui lòng đăng nhập để tiếp tục')}
          </p>
          
          {!loading && (
            <>
              {user ? (
                <Button size="lg" onClick={() => navigate("/")}>
                  Đi đến trang chủ
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => navigate("/auth")}>
                    Đăng nhập
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
