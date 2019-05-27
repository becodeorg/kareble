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
    All of our {totalMembers} BeCodians, coaches or learners, are using GitHub
    on daily basis, collecting green squares on their profiles.
</p>

<p>
    And now, introducing... our
    <em>blue squares</em>!
    <br />
    All the contributions of the last year, from all the BeCodians!
</p>

<ContributionsBoard />

<Footer />
