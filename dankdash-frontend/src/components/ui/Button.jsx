import React from 'react';

const Button = ({ children, className, size, variant, ...props }) => {
  let sizeClass = '';
  if (size === 'lg') {
    sizeClass = 'px-8 py-3 text-lg';
  }

  let variantClass = '';
  if (variant === 'outline') {
    variantClass = 'bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100';
  }

  return (
    <button className={`rounded-full font-medium transition-colors ${sizeClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;


