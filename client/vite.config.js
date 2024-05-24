import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    // omdat index.html, entry point van de app, nu in 'src' zit
    root: "src",
    // omdat de root nu in src zit is het pad naar de publicDir nu ../public
    publicDir: "../public",
    envDir: "../",

    base: "./",

    build: {
        outDir: "../dist",
        emptyOutDir: true,

        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                activiteitDetail: resolve(
                    __dirname,
                    "src/activiteitDetail/index.html"
                ),
                activiteiten: resolve(__dirname, "src/activiteiten/index.html"),
                activiteitMaken: resolve(
                    __dirname,
                    "src/activiteitMaken/index.html"
                ),
                bewoners: resolve(__dirname, "src/bewoners/index.html"),
                landingspagina: resolve(
                    __dirname,
                    "src/landingspagina/index.html"
                ),
                login: resolve(__dirname, "src/login/index.html"),
                profiel: resolve(__dirname, "src/profiel/index.html"),
                profielDetail: resolve(
                    __dirname,
                    "src/profielDetail/index.html"
                ),
                registreer: resolve(__dirname, "src/registreer/index.html"),
            },
        },
    },
});
