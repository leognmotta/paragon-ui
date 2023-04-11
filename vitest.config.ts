import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./setupTest.ts'],
    environment: 'happy-dom',
    include: ['packages/**/*.test.{ts,tsx}'],
    coverage: {
      include: ['packages/**/*.test.{ts,tsx}'],
    },
  },
})
