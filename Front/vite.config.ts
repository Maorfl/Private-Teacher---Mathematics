import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "sass";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Micha Ioffe",
                short_name: "MI-Math",
                description: "Micha Ioffe - Mathematics",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "/src/assets/images/logo-144.png",
                        sizes: "144x144",
                        type: "image/png",
                    },
                    {
                        src: "/src/assets/images/logo-192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/src/assets/images/logo-512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
    build: {
        outDir: "../Back/public",
        emptyOutDir: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass,
            },
        },
    },
});
