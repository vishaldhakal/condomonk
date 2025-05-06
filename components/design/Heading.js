import React from "react";

const Heading = ({
  children,
  subtitle,
  align = "center",
  color = "#1a1a1a",
  highlightColor = "#FF0000",
  maxWidth = "800px",
  subtitleColor = "#666",
  maxWidthsubtitle = "600px",
  className,
}) => {
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <div
      className={`flex flex-col mb-8 w-full ${alignmentClasses[align]} ${className}`}
    >
      <h2
        className="text-[1.4rem] md:text-[2.1em] font-extrabold leading-tight md:leading-normal w-full m-0 p-0"
        style={{
          color,
          maxWidth,
        }}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className={`text-[0.9rem] md:text-[0.95rem] font-normal leading-relaxed md:leading-normal mt-[0.2rem] m-0 p-0 ${
            maxWidthsubtitle ? `max-w-xxs md:max-w-3xl` : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Heading;
