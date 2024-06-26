/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   "uploadthing.com",
    //   "lh3.googleusercontent.com",
    //   "utfs.io",
    //   "avatars.githubusercontent.com",
    // ],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
