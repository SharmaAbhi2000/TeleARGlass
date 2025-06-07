import React from "react";


const Badge = ({
  variant = "primary",
  children,
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

  const variantStyles = {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    info: "bg-indigo-100 text-indigo-800",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return <span className={combinedClassName}>{children}</span>;
};

export default Badge;
