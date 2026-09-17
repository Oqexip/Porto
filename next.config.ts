import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["lucide-react"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

