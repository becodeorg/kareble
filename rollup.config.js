/* becodeorg/kareble
 *
 * /rollup.config.js
 *
 * coded by leny@BeCode
 * started at 25/05/2019
 */

import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";
import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import {terser} from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";

const PRODUCTION = !process.env.ROLLUP_WATCH;

export default {
    input: "src/main.js",
    output: {
        sourcemap: true,
        file: "public/bundle.js",
        format: "iife",
        name: "app",
    },
    plugins: [
        json(),
        babel({
            include: ["./src/**/*.js"],
        }),
        svelte({
            compilerOptions: {
                dev: !PRODUCTION,
            },
        }),
        css({output: "main.css"}),
        resolve(),
        commonjs(),
        PRODUCTION && terser(),
    ],
};
