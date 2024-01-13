/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["puppeteer-extra", "puppeteer-extra-plugin-stealth", "puppeteer-extra-plugin-recaptcha"],
    },
    transpilePackages: ["puppeteer"],
};

module.exports = nextConfig;
