"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import Image from "next/image";
const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-0 z-[50] w-full border-b border-neutral-200 bg-white h-[64px] px-[30px] items-center flex" , className)}
    >
    <div className="flex">
        <div className="mr-4 hidden md:flex">
        <Link
          className="flex items-center justify-center space-x-2 text-2xl font-bold  text-center text-neutral-600 dark:text-gray-100 selection:bg-emerald-500 mr-10"
          href="/"
        >
          <div className="relative h-8 w-[200px] text-white   flex items-center justify-center rounded-md text-[32px] antialiased">
          
          <div className="flex  w-full">
            <h1 className="text-black font-sans">
        
          Zero Build
            </h1>
          </div>
          </div>
        </Link>
      </div>
      <Menu setActive={setActive}>
        <HoveredLink href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="About"
          ></MenuItem>
        </HoveredLink>
        {/* <MenuItem setActive={setActive} active={active} item="Our Courses">
          <div className="flex flex-col gap-5 space-v-4 text-sm">
            <HoveredLink href="/courses">All Courses</HoveredLink>
            <HoveredLink href="/courses">Basic Music Theory</HoveredLink>
            <HoveredLink href="/courses">Advanced Composition</HoveredLink>
            <HoveredLink href="/courses">Songwriting</HoveredLink>
            <HoveredLink href="/courses">Music Production</HoveredLink>
          </div>
        </MenuItem> */}
        <Link href={"/projects"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Projects"
          ></MenuItem>
        </Link>
        <Link href={"/services"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Services"
          ></MenuItem>
        </Link>

        <Link href={"/contact"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Contact"
          ></MenuItem>
        </Link>
      </Menu>
    </div>
    </div>
  );
};

export default Navbar;
