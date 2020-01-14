<script>
    /* becodeorg/kareble
     *
     * /src/components/app.svelte - App Component
     *
     * coded by leny@BeCode
     * started at 25/05/2019
     */

    import Header from "./header.svelte";
    import Footer from "./footer.svelte";
    import ContributionsBoard from "./contributions/board.svelte";
    import {totalMembers} from "../../data/contributions.json";
</script>

<Header />

<p>
    Here at
    <a href="https://becode.org">BeCode</a>, we love
    <strong>git</strong>
    and
    <strong>GitHub</strong>.
</p>

<p>
    Our {totalMembers} BeCodians, coaches or learners, are using GitHub
    on a daily basis, collecting little green squares on their profiles.
</p>

<p>
    And now, introducing... our
    <a href="https://medium.com/becode/collecting-squares-together-cc3177a65c86" target="_new"><em>blue squares</em></a>!
    <br />
    All the contributions of the last year, from all the BeCodians!
</p>

<ContributionsBoard />

<Footer />
