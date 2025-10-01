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
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shining-button";

  const variantStyles = {
    primary: "bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500 shadow-sm hover:shadow-md shining-teal",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-400 border border-gray-200 shining-gray",
    outline:
      "border border-gray-300 hover:bg-gray-50 text-gray-800 focus:ring-gray-400 bg-white shining-gray",
    ghost: "hover:bg-gray-100 text-gray-800 focus:ring-gray-400 shining-gray",
    link: "text-teal-600 hover:text-teal-800 underline focus:ring-teal-500",
  };

  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
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
