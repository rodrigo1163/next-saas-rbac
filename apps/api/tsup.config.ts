import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/http/server.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs'],
  noExternal: ['@saas/auth', '@saas/env'],
  external: ['@prisma/client'],
})
