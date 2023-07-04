"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type AuthGroupLayoutProps = {
  children: React.ReactNode;
};

const AuthGroupLayout: React.FC<AuthGroupLayoutProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <section className="h-screen w-screen flex items-center justify-center">
        <div className="container h-full grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-1">
          {children}
        </div>
      </section>
    </QueryClientProvider>
  );
};

export default AuthGroupLayout;
