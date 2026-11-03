import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { documentApi } from './server/documents.mjs'
import { feedbackApi } from './server/feedback.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'learnspace-documents',
    configureServer(server) { server.middlewares.use(feedbackApi()); server.middlewares.use(documentApi()); },
    configurePreviewServer(server) { server.middlewares.use(feedbackApi()); server.middlewares.use(documentApi()); },
  }],
})
