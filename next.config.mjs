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
    ],
  },
};

export default nextConfig;
