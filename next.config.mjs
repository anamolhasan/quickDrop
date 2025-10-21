// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'img.daisyui.com',
       
//       },
      
//     ],
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.daisyui.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
