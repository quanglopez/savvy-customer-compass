import React, { useRef, useState, useEffect, CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SidebarProps {
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
  style?: CSSProperties;
  trigger: React.ReactNode;
  dataSidebar?: string;
  dataMobile?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  side = "left",
  className,
  style,
  trigger,
  dataSidebar = "lg",
  dataMobile = "sm",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sheetContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const sidebarStyle: CSSProperties = {
    left: side === "left" ? 0 : "auto",
    right: side === "right" ? 0 : "auto",
    ...style,
  };

  const shouldRenderAsSheet = () => {
    if (dataSidebar === "always") {
      return false;
    }

    if (dataSidebar === "never") {
      return true;
    }

    return window.innerWidth < 1024;
  };

  if (shouldRenderAsSheet()) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          side={side}
          className={cn(className)}
        >
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      data-sidebar={dataSidebar}
      data-mobile={dataMobile}
      className={cn(
        "hidden lg:flex flex-col border-r bg-background text-foreground w-64 shrink-0 transition-all",
        className
      )}
      style={sidebarStyle}
    >
      {children}
    </aside>
  );
};

export default Sidebar;
