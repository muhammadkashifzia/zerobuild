"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    title: string;
    address: string;
    description: string;
    image?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    // only add animation/duplication if enough items
    if (items.length > 2) {
      addAnimation();
    }
  }, [items]);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // duplicate only if > 2 items
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden md:[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 pb-[40px] w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.title}-${idx}`}
            className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>

              <div className="relative z-20 flex items-start justify-between gap-4">
                {/* Left Side - Text Content */}
                <div className="flex-1 min-w-0">
                  <span className="text-sm leading-[1.6] text-gray-100 font-normal block mb-3">
                    {item.title}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                      {item.address}
                    </span>
                    <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                      {item.description}
                    </span>
                  </div>
                </div>

                {/* Right Side - Logo */}
                {item.image && item.image.trim() !== "" && (
                  <div className="flex-shrink-0 w-16 h-16 md:w-12 md:h-12">
                    <Image
                      src={item.image}
                      alt="logo"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                )}
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
