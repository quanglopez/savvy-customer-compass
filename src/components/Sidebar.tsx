
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  BarChart3,
  MessageSquare,
  Settings,
  Home,
  PuzzleIcon,
  Users,
  CornerDownRight,
  Globe,
  ServerIcon,
  ShieldCheck,
  Sparkles,
  LogOut,
} from "lucide-react";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  subItem?: boolean;
};

const NavItem = ({ icon, label, to, active, subItem }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
      subItem ? "pl-9" : "",
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
    )}
  >
    {subItem ? <CornerDownRight size={16} /> : icon}
    <span>{label}</span>
  </Link>
);

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { signOut, user } = useAuth();

  const navItems = [
    {
      icon: <Home size={20} />,
      label: "Tổng quan",
      to: "/",
    },
    {
      icon: <PuzzleIcon size={20} />,
      label: "Xây dựng chatbot",
      to: "/builder",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "Hội thoại",
      to: "/conversations",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Phân tích",
      to: "/analytics",
    },
    {
      icon: <Users size={20} />,
      label: "Khách hàng",
      to: "/customers",
    },
    {
      icon: <Globe size={20} />,
      label: "Đa kênh",
      to: "/channels",
    },
    {
      icon: <ServerIcon size={20} />,
      label: "Tích hợp",
      to: "/integrations",
    },
    {
      icon: <ShieldCheck size={20} />,
      label: "Bảo mật",
      to: "/security",
    },
    {
      icon: <Sparkles size={20} />,
      label: "Tính năng nâng cao",
      to: "/advanced",
    },
    {
      icon: <Settings size={20} />,
      label: "Cài đặt",
      to: "/settings",
    },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="h-screen flex flex-col bg-sidebar fixed inset-y-0 z-30 w-64 border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-xl font-bold text-sidebar-foreground flex items-center">
          <MessageSquare className="mr-2" />
          Savvy Customer Compass
        </h2>
      </div>
      <div className="flex-1 overflow-auto p-3">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              active={pathname === item.to}
            />
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
              {user?.email?.substring(0, 2).toUpperCase() || "UD"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sidebar-foreground font-medium text-sm truncate">
                {user?.email || "User Demo"}
              </p>
              <p className="text-sidebar-foreground/60 text-xs">Admin</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2 flex items-center justify-center gap-2"
            onClick={handleSignOut}
          >
            <LogOut size={16} />
            <span>Đăng xuất</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
