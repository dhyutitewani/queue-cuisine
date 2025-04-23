/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
      NEXT_PUBLIC_PAYPAL_SECRET: process.env.PAYPAL_SECRET,
    },
  };
  
  export default nextConfig;
  