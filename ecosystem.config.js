module.exports = {
  apps: [
    {
      name: 'api',
      cwd: '/var/www/drahmed/apps/api',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '500M',
      error_file: '/var/www/drahmed/logs/api-error.log',
      out_file: '/var/www/drahmed/logs/api-out.log',
      time: true,
    },
    {
      name: 'web',
      cwd: '/var/www/drahmed/apps/web',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '500M',
      error_file: '/var/www/drahmed/logs/web-error.log',
      out_file: '/var/www/drahmed/logs/web-out.log',
      time: true,
    },
  ],
};
