import React from 'react';
import { colors } from '../../utils/colors';

const CTAButton = ({ 
  children = "PROBA UNA CLASE GRATIS",
  onClick,
  className = '',
  backgroundColor = colors.brand,
  color = '#FFF',
  borderColor = colors.brand,
  ...props 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    // If no onClick provided, it should be passed from parent (onOpenContact)
  };

  return (
    <button
      onClick={handleClick}
      className={`whitespace-nowrap font-medium text-lg px-12 py-4 transform hover:scale-105 transition-all duration-300 uppercase tracking-wide w-full max-w-sm font-space ${className}`}
      style={{
        borderRadius: '160.054px',
        border: `1.601px solid ${borderColor}`,
        background: backgroundColor,
        color: color,
        backdropFilter: 'blur(5.300000190734863px)'
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default CTAButton;

