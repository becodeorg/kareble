<script>
    /* becodeorg/kareble
     *
     * /src/components/contributions/contributor.svelte - Contributions Component: contributor
     *
     * coded by leny@BeCode
     * started at 27/05/2019
     */

    export let index;
    export let login;
    export let count;

    export let important = false;
</script>

<style>
    li {
        position: relative;
        width: 100%;
        margin-bottom: 1rem;
        background: #a1d8dd;
        padding: 0.25rem 0.5rem;
    }

    .important {
        width: 100%;
        background: #58c4d8;
        font-size: 1.6rem;
        padding: 0.25rem 0.25rem 0.25rem 5.5rem;
    }

    .important span {
        position: absolute;
        display: block;
        width: 4rem;
        text-align: center;
        bottom: -1rem;
        left: 1rem;
        font: bold 5.5rem "Montserrat", sans-serif;
        line-height: 1;
        color: white;
    }

    .important a {
        color: #243a5b;
        display: block;
        font-size: 2rem;
    }

    .important strong {
        font-weight: normal;
        color: white;
        font-size: 1.6rem;
    }

    span {
        display: inline-block;
        width: 3.75rem;
        font: bold 2rem "Montserrat", sans-serif;
        color: white;
    }

    a {
        color: #243a5b;
    }

    strong {
        font-weight: normal;
        color: white;
        font-size: 1.4rem;
    }

    @media screen and (min-width: 768px) {
        li {
            width: 49%;
        }

        span {
            display: inline;
            font: bold 2rem "Montserrat", sans-serif;
            color: white;
        }
    }
</style>

<li class:important>
    <span>{index + 1}</span>
    <a href="https://github.com/{login}">{login}</a>
    <strong title="{count} contribution{count > 1 ? 's' : ''}">
         {important ? `${count} contribution${count > 1 ? 's' : ''}` : `(${count})`}

    </strong>
</li>
