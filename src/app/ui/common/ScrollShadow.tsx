import React from "react";

interface IScrollShadowProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollShadow({
  children,
  className = "",
}: IScrollShadowProps) {
  return (
    <div
      style={{
        background: `
          linear-gradient(white 30%, rgba(255, 255, 255, 0)),
          linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,      
          radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0)),
          radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0)) 0 100%
        `,
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
        backgroundSize: "100% 20px, 100% 20px, 100% 10px, 100% 10px",
        backgroundAttachment: "local, local, scroll, scroll",
      }}
      className={`py-8 overflow-auto ${className}`}
    >
      {children}
    </div>
  );
}
