<script>
    /* becodeorg/kareble
     *
     * /src/components/contributions/board.svelte - Contributions Component: board
     *
     * coded by leny@BeCode
     * started at 25/05/2019
     */

    import {DateTime} from "luxon";
    import {
        buildDate,
        totalMembers,
        totalContributions,
        weeks,
    } from "../../../data/contributions.json";

    import Week from "./week.svelte";
    import Contributors from "./contributors.svelte";

    let selectedDay = null;

    const handleSelectDay = day => {
        selectedDay = selectedDay && selectedDay.date === day.date ? null : day;
    };
</script>

<style>
    .board {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        padding-top: 2rem;
    }

    h3 {
        margin-bottom: 0.5rem;
        font-size: 1.6rem;
        color: #16232e;
    }
</style>

<div class="wrapper">
    <h3>{totalContributions} contributions by {totalMembers} BeCodians</h3>

    <div class="board" class:with-selection={selectedDay}>
        {#each weeks as days, index}
            <Week
                {days}
                {index}
                {selectedDay}
                prevWeekMonth={DateTime.fromFormat(weeks[index > 0 ? index - 1 : 0][0].date, 'yyyy-MM-dd').month}
                onSelectDay={handleSelectDay} />
        {/each}
    </div>

    {#if selectedDay && selectedDay.date}
        <Contributors {selectedDay} />
    {/if}
</div>
