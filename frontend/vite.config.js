import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs";
import path from "path";

const keyPath = path.resolve(__dirname, "./key.pem");
const certPath = path.resolve(__dirname, "./xcert.pem");
const hasSSL = fs.existsSync(keyPath) && fs.existsSync(certPath);

export default defineConfig({
  plugins: [react()],
  server: hasSSL
    ? {
        https: {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath),
        },
        port: 443,
        host: "0.0.0.0",
      }
    : {
        port: 80,
        host: "0.0.0.0",
      },
});
