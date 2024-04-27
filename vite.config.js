// import { defineConfig } from 'vite';

// TODO: correct configuration when building the final application

// export default defineConfig({
//   root: './',
//   build: {
//     outDir: 'dist',
//     assetsInclude: ['css/**', 'imagenes/**', 'javascript/**', 'user.png']
//   }
// });

// export default defineConfig({
//   build: {
//     outDir: 'dist',
//     assetsInlineLimit: 0,
//     assetsDir: 'assets',
//   },
// });


import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        // main: '/path/to/main.js', // reemplaza esto con la ruta a tu archivo principal
        main: './main.js', // reemplaza esto con la ruta a tu archivo principal
      },
    },
    assetsInclude: ['**/*.css', '**/*.png', '**/*.js'],
  },
});