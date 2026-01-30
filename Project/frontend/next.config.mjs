/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "t2o.sampledge.duckdns.org",
    "*.turn2opinion.com",
    "www.turn2opinion.com",
    "new.turn2opinion.com"
  ],
  output: "export"
};

export default nextConfig;
