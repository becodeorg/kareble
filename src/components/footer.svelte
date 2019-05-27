<script>
    /* becodeorg/kareble
     *
     * /src/components/footer.svelte - Footer Component
     *
     * coded by leny@BeCode
     * started at 27/05/2019
     */
</script>

<style>
    footer {
        position: relative;
        padding: 0.5rem 0;
        text-align: center;
    }

    footer::before {
        content: "";
        display: block;
        height: 1px;
        margin: 0.5rem 0 1.5rem;
        background: #a1d8dd;
    }

    footer p {
        font-size: 1.4rem;
        margin: 0;
    }
</style>

<footer>
    <p>
        Made with ❤️ by
        <a href="//leny.me">leny</a>
        <br />
        <a href="//github.com/becodeorg/kareble">Check the code on GitHub!</a>
    </p>
</footer>
