import { defineConfig } from 'vite';

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
