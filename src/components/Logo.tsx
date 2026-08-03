import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showSubtitle = false }) => {
  const sizeMap = {
    sm: { container: 'w-7 h-7 text-xs', font: 'text-sm' },
    md: { container: 'w-10 h-10 text-sm', font: 'text-lg' },
    lg: { container: 'w-14 h-14 text-lg', font: 'text-2xl' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Diamond TCS Logo Icon */}
      <div className="relative flex items-center justify-center">
        <div 
          className={`${currentSize.container} bg-[#003f87] transform rotate-45 rounded-sm shadow-sm flex items-center justify-center transition-transform hover:scale-105`}
        >
          <span className="transform -rotate-45 font-black text-white tracking-tighter select-none">
            TCS
          </span>
        </div>
      </div>
      
      {/* Title & Optional Subtitle */}
      <div>
        <h1 className={`font-extrabold tracking-tight text-[#003f87] ${currentSize.font} leading-none`}>
          TCS <span className="font-normal text-[#595f65]">Admin</span>
        </h1>
        {showSubtitle && (
          <p className="text-[11px] font-medium text-[#424752] tracking-wide uppercase mt-0.5">
            Ture Cleaning Services
          </p>
        )}
      </div>
    </div>
  );
};
