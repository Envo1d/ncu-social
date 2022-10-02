/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    APP_ENV: process.env.APP_ENV,
    APP_API_URL: process.env.APP_API_URL,
    APP_CREDENTIALS: process.env.APP_CREDENTIALS
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: '@graphql-tools/webpack-loader',
      options: {
        /* ... */
      }
    })

    return config
  }
}

module.exports = nextConfig
