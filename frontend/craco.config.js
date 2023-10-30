const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      "@pages": path.resolve(__dirname, 'src/pages'),
      "@config": path.resolve(__dirname, 'src/config'),
      "@context": path.resolve(__dirname, 'src/context'),
      "@hooks": path.resolve(__dirname, 'src/hooks'),
      "@models": path.resolve(__dirname, 'src/models'),
      "@services": path.resolve(__dirname, 'src/services'),
      "@assets": path.resolve(__dirname, 'src/assets'),
      "@types": path.resolve(__dirname, 'src/types'),
    },
  },
};
