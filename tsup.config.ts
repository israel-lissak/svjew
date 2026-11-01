import { defineConfig, type Options } from 'tsup';

const shared: Options = {
  entry: {
    index: 'src/index.ts',
    core: 'src/core/index.ts',
    icons: 'src/icons/index.ts',
  },
  dts: true,
  clean: false, // `npm run build` wipes dist/ once; the two configs run in parallel
  treeshake: true,
  splitting: true,
  target: 'es2020',
  external: ['react', 'react/jsx-runtime'],
};

export default defineConfig([
  // ESM: @hebcal/core stays an external dependency.
  {
    ...shared,
    format: 'esm',
    sourcemap: true,
    external: [...shared.external!, '@hebcal/core'],
  },
  // CJS: @hebcal/core is ESM-only (its package exports have no "require" condition),
  // so `require('@hebcal/core')` cannot resolve. Bundle it into the CJS build, minified
  // and without source maps to keep the package small.
  {
    ...shared,
    format: 'cjs',
    minify: true,
    sourcemap: false,
    noExternal: [/^@hebcal\//, 'temporal-polyfill'],
  },
]);
