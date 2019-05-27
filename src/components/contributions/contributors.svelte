<script>
    /* becodeorg/kareble
     *
     * /src/components/contributions/contributors.svelte - Contributions Component: contributors
     *
     * coded by leny@BeCode
     * started at 27/05/2019
     */

    import {DateTime} from "luxon";
    import Contributor from "./contributor.svelte";

    export let selectedDay;
</script>

<style>
    h4 {
        margin: 1rem 0 2rem;
    }

    h4 time {
        display: flex;
        margin-bottom: 1rem;
        justify-content: space-between;
        align-items: center;
    }

    h4 time span {
        display: block;
        flex: none;
        margin: 0 1rem;
        font-size: 1.6rem;
        color: #243a5b;
    }

    h4 time::before {
        content: "";
        display: block;
        height: 1px;
        flex: 1 0 auto;
        background: #a1d8dd;
    }

    h4 time::after {
        content: "";
        display: block;
        height: 1px;
        flex: 1 0 auto;
        background: #a1d8dd;
    }

    h4 strong {
        display: block;
        margin-top: 1rem;
        text-align: center;
        font-size: 1.7rem;
        color: #50a7b2;
    }

    ol {
        list-style: inside none;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        padding: 0;
    }
</style>

<div class="contributors">
    <h4>
        <time
            datetime={DateTime.fromFormat(selectedDay.date, 'yyyy-MM-dd').toHTTP()}>
            <span>
                 {DateTime.fromFormat(selectedDay.date, 'yyyy-MM-dd').toFormat('cccc, dd MMMM yyyy')}

            </span>
        </time>

        <strong>
             {selectedDay.totalContributions} contribution{selectedDay.totalContributions > 1 ? 's' : ''}
            by {selectedDay.members.length} BeCodians
        </strong>
    </h4>

    <ol>
        {#each selectedDay.members as [count, login], index}
            <Contributor {count} {login} {index} important={index < 5} />
        {/each}
    </ol>
</div>
