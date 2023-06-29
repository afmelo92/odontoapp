import React from "react";

type AuthGroupLayoutProps = {
  children: React.ReactNode;
};

const AuthGroupLayout: React.FC<AuthGroupLayoutProps> = ({ children }) => {
  return (
    <section className="border-2 border-red-500 h-screen w-screen flex items-center justify-center">
      <div className="border-2 border-blue-500 container h-full grid grid-cols-1 md:grid-cols-2 md:grid-rows-1">
        {children}
      </div>
    </section>
  );
};

export default AuthGroupLayout;
