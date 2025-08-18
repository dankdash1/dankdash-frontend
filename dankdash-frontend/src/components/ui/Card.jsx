import React from 'react';

const Card = ({ children, className, ...props }) => {
  return (
    <div className={`bg-white rounded-lg shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={`p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={`text-lg font-semibold ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`p-4 pt-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardDescription = ({ children, className, ...props }) => {
  return (
    <p className={`text-sm text-gray-500 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export { Card, CardHeader, CardTitle, CardContent, CardDescription };


