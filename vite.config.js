import { defineConfig } from 'vite';

// TODO: correct configuration when building the final application
// export default defineConfig({
//   root: './',
//   build: {
//     outDir: 'dist',
//     assetsInclude: ['css/**', 'imagenes/**', 'javascript/**', 'user.png']
//   }
// });

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    assetsDir: 'assets',
  },
});
