"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const Navbar = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  const [active, setActive] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const getLinkPath = (item: string) => (item === "home" ? "/" : `/${item}`);
  const isActive = (item: string) =>
    currentPath === (item === "home" ? "/" : `/${item}`);

  return (
    <div
      className={cn(
        "fixed top-0 z-[50] w-full border-b border-neutral-200 bg-white items-center flex shadow-[0_1px_2px_1px_rgba(6,10,36,0.08)]",
        className
      )}
    >
      <div className="container flex justify-between h-[64px] mx-auto px-[16px]">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex w-[192px]">
            <Link
              className="flex items-center justify-center space-x-2 text-2xl font-bold text-center text-neutral-600"
              href="/"
            >
              <div className="relative h-8 w-[192px] gap-[5px] flex items-center justify-between rounded-md text-[28px] antialiased">
                <Image
                  src="/assets/images/5CZLogo.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="h-[50px] w-auto"
                />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                  ZeroBuild
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center w-full justify-between relative navLink">
          <Menu setActive={setActive}>
            {["about", "services", "projects", "contact"].map((item) => (
              <HoveredLink key={item} href={getLinkPath(item)}>
                <div
                  className={cn(
                    "relative  transition-[1s] text-black menuItem",
                    isActive(item) && "font-bold activeMenuItem"
                  )}
                >
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item={item.charAt(0).toUpperCase() + item.slice(1)}
                  />
                </div>
              </HoveredLink>
            ))}
          </Menu>

          <Link
            href="/resources"
            className="gap-[5px] w-full bg-[#484AB7] text-white border-neutral-200 px-2 rounded-xl max-w-[200px] h-[45px] flex items-center justify-center text-[16px] font-semibold hover:bg-[#3c3f9d] transition-colors duration-200"
          >
            View all Resources <ArrowRight />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden focus:outline-none"
        >
          <div className="w-[30px] h-6 relative flex flex-col justify-center items-center">
            {sidebarOpen ? (
              <>
                <span className="absolute h-0.5 w-full bg-[#2c3237] rotate-45" />
                <span className="absolute h-0.5 w-full bg-[#2c3237] -rotate-45" />
              </>
            ) : (
              <>
                <span className="absolute h-0.5 w-full bg-[#2c3237] top-[0%]" />
                <span className="absolute h-0.5 w-full bg-[#2c3237] top-[30%]" />
                <span className="absolute h-0.5 w-full bg-[#2c3237] top-[60%]" />
              </>
            )}
          </div>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-full w-80 bg-[#F4F4F4] shadow-lg transition-transform duration-300 z-50`}
      >
        <div className="absolute right-2 top-2 z-50">
          <button onClick={handleCloseSidebar}>
            <span className="text-[40px] text-[#5f5e5e] font-[300]">×</span>
          </button>
        </div>

        <div className="pt-[15px]">
          <div className="flex items-center justify-center pt-2 px-[16px]">
            <HoveredLink
              className="flex items-center justify-center space-x-2 text-2xl font-bold text-center text-neutral-600"
              href="/"
              onClick={handleCloseSidebar}
            >
              <div className="relative h-8 w-[200px] flex items-center justify-center rounded-md text-[32px] antialiased gap-[10px]">
                <Image
                  src="/assets/images/5CZLogo.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="h-[50px] w-auto"
                />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                  ZeroBuild
                </span>
              </div>
            </HoveredLink>
          </div>

          <div className="flex flex-col items-start px-[16px] pt-[50px] space-y-1">
            {["about", "services", "projects", "contact"].map((item) => (
              <HoveredLink
                key={item}
                href={getLinkPath(item)}
                className={cn(isActive(item) ? "active" : "")}
                onClick={handleCloseSidebar} // ✅ Close sidebar when clicked
              >
                <div
                  className={cn(
                    "w-full px-2 py-3 rounded-[4px]",
                    isActive(item)
                      ? "text-white font-bold bg-[#484AB7]"
                      : "text-black"
                  )}
                >
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item={item.charAt(0).toUpperCase() + item.slice(1)}
                  />
                </div>
              </HoveredLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
