import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, 
  Video, 
  Heart, 
  Calendar, 
  Users, 
  BookOpen, 
  MessageSquare, 
  DollarSign,
  Crown,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home"), icon: Home },
  { title: "Sermons", url: createPageUrl("Sermons"), icon: Video },
  { title: "Prayer Wall", url: createPageUrl("PrayerWall"), icon: Heart },
  { title: "Events", url: createPageUrl("Events"), icon: Calendar },
  { title: "Members", url: createPageUrl("Members"), icon: Users },
  { title: "Leaders", url: createPageUrl("Leaders"), icon: Crown },
  { title: "Book Club", url: createPageUrl("BookClub"), icon: BookOpen },
  { title: "Forum", url: createPageUrl("Forum"), icon: MessageSquare },
  { title: "Give", url: createPageUrl("Give"), icon: DollarSign },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --navy: #2D3E82;
          --navy-light: #4A5FAF;
          --navy-dark: #1A2554;
          --gold: #C9A961;
          --gold-light: #E8D5A8;
          --rose: #E8B4B8;
          --rose-light: #F5E1E3;
          --ivory: #FAF8F5;
          --charcoal: #2C2C2E;
          --gray-soft: #6B6B6D;
          --white: #FFFFFF;
        }
        
        body {
          background: var(--ivory);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: var(--charcoal);
        }

        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
      
      <div className="min-h-screen flex w-full bg-[#FAF8F5]">
        {/* Desktop Sidebar */}
        <Sidebar className="border-r border-[#E8D5A8]/30 bg-white hidden md:flex">
          <SidebarHeader className="border-b border-[#E8D5A8]/30 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2D3E82] to-[#4A5FAF] rounded-2xl flex items-center justify-center shadow-lg">
