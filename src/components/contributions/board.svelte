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
    let hoveredDay = null;

    const handleHoverDay = day => {
        hoveredDay = day;
    };

    const handleOutBoard = () => {
        hoveredDay = null;
    };

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
        margin: 5rem auto 1.5rem;
        text-align: center;
        font-size: 2rem;
        color: #243a5b;
    }

    .day-label {
        min-height: 2.4rem;
        font-size: 1.4rem;
        line-height: 2.4rem;
        text-align: center;
    }
</style>

<div class="wrapper">
    <h3>{totalContributions} contributions by {totalMembers} BeCodians</h3>

    <div
        class="board"
        class:with-selection={selectedDay}
        on:mouseout={handleOutBoard}>
        {#each weeks as days, index}
            <Week
                {days}
                {index}
                {selectedDay}
                prevWeekMonth={DateTime.fromFormat(weeks[index > 0 ? index - 1 : 0][0].date, 'yyyy-MM-dd').month}
                onHoverDay={handleHoverDay}
                onSelectDay={handleSelectDay} />
        {/each}
    </div>

    <div class="day-label">
        {#if hoveredDay}
            {DateTime.fromFormat(hoveredDay.date, 'yyyy-MM-dd').toFormat('cccc, dd MMMM yyyy')}
            - {hoveredDay.totalContributions} contribution{hoveredDay.totalContributions > 1 ? 's' : ''}
        {/if}
    </div>

    {#if selectedDay && selectedDay.date}
        <Contributors {selectedDay} />
    {/if}
</div>
