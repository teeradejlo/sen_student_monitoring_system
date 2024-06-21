/** @type {import('next').NextConfig} */

const nextConfig = {
	// reactStrictMode: false,
	experimental: {
		serverComponentsExternalPackages: ['sequelize'],
	}
};

export default nextConfig;
