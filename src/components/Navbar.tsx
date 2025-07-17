"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";

const Navbar = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  const [active, setActive] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    // Set the pathname after hydration to avoid mismatch
    setCurrentPath(pathname);
  }, [pathname]);

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div
      className={cn(
        "fixed top-0 z-[50] w-full border-b border-neutral-200 bg-white items-center flex  shadow-[0_1px_2px_1px_rgba(6,10,36,0.08)]",
        className
      )}
    >
      <div className="container flex justify-between h-[64px] mx-auto px-[16px]">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="mr-4 flex">
            <Link
              className="flex items-center justify-center space-x-2 text-2xl font-bold text-center text-neutral-600 dark:text-gray-100"
              href="/"
            >
              <div className="relative h-8 w-[200px] flex items-center justify-start md:justify-start rounded-md text-[32px] antialiased">
                <h1 className="text-black font-sans">Zero Build</h1>
              </div>
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 md:flex-row md:space-x-8">
          <Menu setActive={setActive}>
            {["about", "projects", "services", "contact"].map((item) => (
              <HoveredLink key={item} href={`/${item}`}>
                <div
                  className={
                    currentPath === `/${item}`
                      ? "text-black font-bold w-full border-b-[#484AB7] rounded-[4px] px-2 py-3"
                      : "w-full text-black px-2 py-3"
                  }
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
            href="/"
            className="w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] px-5 rounded-full max-w-[256px] h-[45px] flex items-center justify-center text-[16px] font-semibold hover:bg-[#3c3f9d] transition-colors duration-200"
          >
            View all Resources
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden mr-4 focus:outline-none absolute right-[0px] top-[50%] transform -translate-y-1/2"
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
        <div className="absolute right-2 top-2">
          <button onClick={handleCloseSidebar}>
            <span className="text-[40px] text-[#5f5e5e] font-[300]">×</span>
          </button>
        </div>

        <div className="pt-[15px]">
          <div className="flex items-center justify-center pt-2">
            <HoveredLink
              className="flex items-center justify-center space-x-2 text-2xl font-bold text-center text-neutral-600 dark:text-gray-100"
              href="/"
            >
              <div className="relative h-8 w-[200px] flex items-center justify-center md:justify-center rounded-md text-[32px] antialiased">
                <h1 className="text-black font-sans">Zero Build</h1>
              </div>
            </HoveredLink>
          </div>

          <div className="flex flex-col items-start px-[16px] pt-[50px]">
            {["about", "services", "projects", "contact"].map((item) => (
              <HoveredLink key={item} href={`/${item}`}>
                <div
                  className={
                    currentPath === `/${item}`
                      ? "text-white font-bold w-full bg-[#484AB7] rounded-[4px] px-2 py-3"
                      : "w-full text-black px-2 py-3"
                  }
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
