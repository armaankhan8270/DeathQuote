import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'destructive' }>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseClasses = "relative w-full rounded-lg border p-4";
    const variantClasses = variant === 'destructive' 
      ? "bg-red-50 border-red-300 text-red-700" 
      : "bg-gray-50 border-gray-300 text-gray-700";

    return (
      <div
        ref={ref}
        role="alert"
        className={`${baseClasses} ${variantClasses} ${className}`}
        {...props}
      />
    );
  }
);

Alert.displayName = "Alert";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`text-sm ${className}`}
      {...props}
    />
  )
);

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription };