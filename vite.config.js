import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // or vue(), depending on your framework

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["dramatic-remover-amplify.ngrok-free.dev"],
  },
});
