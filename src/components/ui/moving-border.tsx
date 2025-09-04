"use client";
import React, { memo, useMemo, useCallback } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/utils/cn";

// Memoized MovingBorder component to prevent unnecessary re-renders
const MovingBorder = memo(({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  // Memoize the animation frame callback
  const animationCallback = useCallback((time: number) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  }, [duration, progress]);

  useAnimationFrame(animationCallback);

  // Memoize transforms to prevent recreation
  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  // Memoize motion div style
  const motionDivStyle = useMemo(() => ({
    position: "absolute" as const,
    top: 0,
    left: 0,
    display: "inline-block" as const,
    transform,
  }), [transform]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div style={motionDivStyle}>
        {children}
      </motion.div>
    </>
  );
});

MovingBorder.displayName = "MovingBorder";

export const Button = memo(({
  borderRadius = "10px",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) => {
  // Memoize calculated border radius values
  const innerBorderRadius = useMemo(() => 
    `calc(${borderRadius} * 0.23)`, [borderRadius]
  );
  
  const contentBorderRadius = useMemo(() => 
    `calc(${borderRadius} * 0.96)`, [borderRadius]
  );

  // Memoize container classes
  const containerClasses = useMemo(() => cn(
    "relative text-xl p-[1px] overflow-hidden w-full !rounded-[10px] max-w-[254px]",
    containerClassName
  ), [containerClassName]);

  // Memoize border classes
  const borderClasses = useMemo(() => cn(
    "h-[56px] w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]",
    borderClassName
  ), [borderClassName]);

  // Memoize content classes
  const contentClasses = useMemo(() => cn(
    "max-w-[254px] h-[56px] relative border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
    className
  ), [className]);

  return (
    <Component
      className={containerClasses}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: innerBorderRadius }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div className={borderClasses} />
        </MovingBorder>
      </div>

      <div
        className={contentClasses}
        style={{
          borderRadius: contentBorderRadius,
        }}
      >
        {children}
      </div>
    </Component>
  );
});

Button.displayName = "Button";
