import { defineConfig } from 'vitest/config';

// Pin the timezone so date-boundary tests are deterministic on any machine.
// Set before workers start, so they inherit it.
process.env.TZ = 'Asia/Jerusalem';

export default defineConfig({
  test: {
    globals: true, // lets @testing-library/react auto-cleanup between tests
    environment: 'jsdom',
    include: ['test/**/*.test.{ts,tsx}'],
  },
});
