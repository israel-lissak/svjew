import { defineConfig, type Options } from 'tsup';

const shared: Options = {
  entry: {
    index: 'src/index.ts',
    core: 'src/core/index.ts',
    icons: 'src/icons/index.ts',
    native: 'src/native/index.ts',
  },
  sourcemap: true,
  treeshake: true,
  splitting: true,
  target: 'es2020',
  external: ['react', 'react/jsx-runtime', 'react-native-svg'],
};

export default defineConfig([
  // ESM: @hebcal/core stays an external dependency.
  {
    ...shared,
    format: 'esm',
    dts: true,
    clean: false,
    external: [...shared.external!, '@hebcal/core'],
  },
  // CJS: @hebcal/core ships ESM-only (its package exports have no "require" condition),
  // so `require('@hebcal/core')` cannot resolve. Bundle it into the CJS build instead.
  {
    ...shared,
    format: 'cjs',
    dts: true,
    clean: false,
    noExternal: [/^@hebcal\//, 'temporal-polyfill'],
  },
]);
