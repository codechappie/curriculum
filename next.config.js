/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["localhost", "res.cloudinary.com"],
    },
    env: {
        BASE_URL: process.env.BASE_URL,
        API_URL: process.env.API_URL,
    }
}

module.exports = nextConfig
