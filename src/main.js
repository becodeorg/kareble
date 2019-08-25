/* becodeorg/kareble
 *
 * /src/main.js - Entry point for svelte app
 *
 * coded by leny@BeCode
 * started at 25/05/2019
 */

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

import App from "./components/app.svelte";

const app = new App({
    target: document.querySelector("#root"),
    props: {},
});

export default app;
