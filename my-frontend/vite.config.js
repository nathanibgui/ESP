import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxFactory: 'React.createElement', // Utilise React.createElement pour JSX
    jsxFragment: 'React.Fragment', // Utilise React.Fragment pour les fragments JSX
  },
})
