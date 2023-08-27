import {defineConfig, UserConfig} from "vite";
import path from "path";
import Vue from "@vitejs/plugin-vue";
import ViteImages from "vite-plugin-vue-images";
import {readFileSync} from "node:fs";

// https://vitejs.dev/config/
export default ({command}: { command: "build" | "serve" }): UserConfig => {
    const port = parseInt(process.env.PUBLIC_PORT || '8000')

    const httpsConfig =
        'production' !== process.env.NODE_ENV || "serve" === command
            ? {
                key: readFileSync('/etc/ssl/private/' + process.env.IO + '.key'),
                cert: readFileSync('/etc/ssl/private/' + process.env.IO + '.crt'),
            }
            : false

    return defineConfig({
        server: {
            port: port,
            host: true,
            strictPort: true,
            https: httpsConfig,
            hmr: {port: port},
        },
        preview: {
            host: true,
            port: port,
            https: httpsConfig,
        },
        plugins: [
            Vue({reactivityTransform: true, script: {propsDestructure: true, defineModel: true}}),
            ViteImages({
                dirs: ["src/assets/images"],
            }),
        ],
        resolve: {
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".css", ".scss"],
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    })
};
