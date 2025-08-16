import React from 'react';

interface LogoIconProps {
  icon?: string;
  logoColors?: {
    primaryColor: string;
    secondaryColor: string;
    gradientDirection: string;
  };
  size?: number;
  className?: string;
}

export function LogoIcon({ icon, logoColors, size = 48, className = "" }: LogoIconProps) {
  if (!logoColors) {
    // Fallback to default colors if no logo colors are specified
    return (
      <div 
        className={`flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-white text-lg font-bold">
          {icon ? icon.charAt(0).toUpperCase() : '★'}
        </span>
      </div>
    );
  }

  const { primaryColor, secondaryColor, gradientDirection } = logoColors;
  
  // Create gradient style based on direction
  const getGradientStyle = () => {
    if (gradientDirection === 'radial') {
      return {
        background: `radial-gradient(circle, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      };
    }
    
    return {
      background: `linear-gradient(${gradientDirection}, ${primaryColor} 0%, ${secondaryColor} 100%)`,
    };
  };

  return (
    <div 
      className={`flex items-center justify-center rounded-full ${className}`}
      style={{ 
        width: size, 
        height: size,
        ...getGradientStyle()
      }}
    >
      <span className="text-white text-lg font-bold drop-shadow-sm">
        {icon ? icon.charAt(0).toUpperCase() : '★'}
      </span>
    </div>
  );
}

// Predefined icon components for common icons
export function ShieldIcon({ logoColors, size = 48, className = "" }: Omit<LogoIconProps, 'icon'>) {
  return (
    <div 
      className={`flex items-center justify-center rounded-full ${className}`}
      style={{ 
        width: size, 
        height: size,
        background: logoColors 
          ? `linear-gradient(${logoColors.gradientDirection}, ${logoColors.primaryColor} 0%, ${logoColors.secondaryColor} 100%)`
          : 'linear-gradient(to bottom right, #3B82F6, #8B5CF6)'
      }}
    >
      <svg 
        width={size * 0.6} 
        height={size * 0.6} 
        viewBox="0 0 24 24" 
        fill="none" 
        className="text-white"
      >
        <path 
          d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" 
          fill="currentColor"
        />
        <path 
          d="M12 7L9 9V13L12 15L15 13V9L12 7Z" 
          fill="white" 
          fillOpacity="0.8"
        />
      </svg>
    </div>
  );
}

export function ChartIcon({ logoColors, size = 48, className = "" }: Omit<LogoIconProps, 'icon'>) {
  return (
    <div 
      className={`flex items-center justify-center rounded-full ${className}`}
      style={{ 
        width: size, 
        height: size,
        background: logoColors 
          ? `linear-gradient(${logoColors.gradientDirection}, ${logoColors.primaryColor} 0%, ${logoColors.secondaryColor} 100%)`
          : 'linear-gradient(to bottom right, #10B981, #059669)'
      }}
    >
      <svg 
        width={size * 0.6} 
        height={size * 0.6} 
        viewBox="0 0 24 24" 
        fill="none" 
        className="text-white"
      >
        <path 
          d="M3 3V21H21" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M9 9L12 6L16 10L21 5" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function CalendarIcon({ logoColors, size = 48, className = "" }: Omit<LogoIconProps, 'icon'>) {
  return (
    <div 
      className={`flex items-center justify-center rounded-full ${className}`}
      style={{ 
        width: size, 
        height: size,
        background: logoColors 
          ? `linear-gradient(${logoColors.gradientDirection}, ${logoColors.primaryColor} 0%, ${logoColors.secondaryColor} 100%)`
          : 'linear-gradient(to bottom right, #F59E0B, #D97706)'
      }}
    >
      <svg 
        width={size * 0.6} 
        height={size * 0.6} 
        viewBox="0 0 24 24" 
        fill="none" 
        className="text-white"
      >
        <rect 
          x="3" 
          y="4" 
          width="18" 
          height="18" 
          rx="2" 
          ry="2" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <line 
          x1="16" 
          y1="2" 
          x2="16" 
          y2="6" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <line 
          x1="8" 
          y1="2" 
          x2="8" 
          y2="6" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <line 
          x1="3" 
          y1="10" 
          x2="21" 
          y2="10" 
          stroke="currentColor" 
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
