module.exports = {
  apps: [
    {
      name: 'tamil-news-website',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/tamil-news',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'strapi-cms',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/tamil-news/strapi-nambikkai',
      env: {
        NODE_ENV: 'production',
        PORT: 1337
      }
    }
  ]
};