import { defineConfig } from 'vitest/config';

// Pin the timezone so date-boundary tests are deterministic on any machine.
process.env.TZ = 'Asia/Jerusalem';

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['test/**/*.test.{ts,tsx}'],
    env: { TZ: 'Asia/Jerusalem' },
  },
});
