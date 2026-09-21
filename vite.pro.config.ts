import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

/** C05: @dashflow/core-pro build. Do not merge this entry into the free package. */
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, './core-pro/dist'),
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, './src/pro/index.ts'),
      name: 'dashflowxCorePro',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@dashflow/core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@dashflow/core': 'dashflowx',
        },
      },
    },
  },
  plugins: [react(), dts({ rollupTypes: true, outDir: 'core-pro/dist', skipDiagnostics: true })],
});
