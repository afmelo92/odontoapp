/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.dentalcremer.com.br",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
