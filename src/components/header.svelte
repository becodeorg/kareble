<script>
    /* becodeorg/kareble
     *
     * /src/components/header.svelte - Header Component
     *
     * coded by leny@BeCode
     * started at 27/05/2019
     */
</script>

<style>
    h1 {
        position: absolute;
        top: -5rem;
        left: -5rem;
        padding: 0.4rem 0.6rem 0.6rem;
        background: #63c3d1;
        font: normal 3.2rem "Montserrat", sans-serif;
        color: white;
        transform: rotate(-5deg);
        box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
        z-index: 20;
    }

    h2 {
        position: absolute;
        top: -0.5rem;
        left: 5rem;
        padding: 0.4rem 1rem 0.6rem 2rem;
        background: #16232e;
        font: normal 2.4rem "Montserrat", sans-serif;
        color: white;
        transform: rotate(0.5deg);
        box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
        z-index: 10;
    }
</style>

<header>
    <h1>Last year at BeCode</h1>
    <h2>...on GitHub</h2>
</header>
