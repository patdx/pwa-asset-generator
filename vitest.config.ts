import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 30_000, // 30 seconds
    // testTimeout: 120000,
  },
  cacheDir: '.jest-cache',
})
