<script>
    import ContributionsBoard from "./contributions/board.svelte";
    import {totalMembers} from "../../data/contributions.json";
</script>

<h1>
    <strong>Last year</strong>
    <em>...on GitHub</em>
</h1>

<p>
    Here at
    <a href="https://becode.org">BeCode</a>
    , we like
    <strong>git</strong>
    and
    <strong>GitHub</strong>
    .
</p>

<p>
    All of our {totalMembers}
    <em>BeCodians</em>
    , coaches or learners, are using GitHub on daily basis, collecting green
    squares on their profiles.
</p>

<p>
    And now, introducing... our
    <em>blue squares</em>
    !
    <br />
    All the contributions of the last year, from all the BeCodians!
</p>

<ContributionsBoard />
