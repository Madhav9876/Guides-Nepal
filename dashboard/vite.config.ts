import react from "@vitejs/plugin-react"

const config = {
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 3000
  },
  server: {
    port: 5176,
    strictPort: true,
    proxy: {
      "/api/v1": {
        target: "http://localhost:8000",
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 5176
  }
}

export default config
