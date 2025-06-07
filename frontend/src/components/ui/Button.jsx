import React from "react";


const Button = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className = "",
  icon,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-400",
    outline:
      "border border-gray-300 hover:bg-gray-100 text-gray-800 focus:ring-gray-400",
    ghost: "hover:bg-gray-100 text-gray-800 focus:ring-gray-400",
    link: "text-blue-600 hover:text-blue-800 underline focus:ring-blue-500",
  };

  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
