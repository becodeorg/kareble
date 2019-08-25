<script>
    /* becodeorg/kareble
     *
     * /src/components/contributions/board.svelte - Contributions Component: board
     *
     * coded by leny@BeCode
     * started at 25/05/2019
     */

    import dayjs from "dayjs";
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
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        padding: 0 0 0 5rem;
    }

    h3 {
        margin: 5rem auto 1.5rem;
        text-align: center;
        font-size: 2rem;
        color: #243a5b;
    }

    .day-label {
        display: none;
    }

    @media screen and (min-width: 768px) {
        h3 br {
            display: none;
        }

        .board {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            padding: 2rem 0 0;
        }

        .day-label {
            display: block;
            min-height: 2.4rem;
            font-size: 1.4rem;
            line-height: 2.4rem;
            text-align: center;
        }
    }
</style>

<div class="wrapper">
    <h3>
         {totalContributions} contributions 
        <br />
        by {totalMembers} BeCodians
    </h3>

    <div
        class="board"
        class:with-selection={selectedDay}
        on:mouseout={handleOutBoard}>
        {#each weeks as days, index}
            <Week
                {days}
                {index}
                {selectedDay}
                prevWeekMonth={dayjs(weeks[index > 0 ? index - 1 : 0][0].date, 'YYYY-MM-DD').month()}
                onHoverDay={handleHoverDay}
                onSelectDay={handleSelectDay} />
        {/each}
    </div>

    <div class="day-label">
        {#if hoveredDay}
            {dayjs(hoveredDay.date, 'YYYY-MM-DD').format('dddd, DD MMMM YYYY')}
            - {hoveredDay.totalContributions} contribution{hoveredDay.totalContributions > 1 ? 's' : ''}
        {/if}
    </div>

    {#if selectedDay && selectedDay.date}
        <Contributors {selectedDay} />
    {/if}
</div>
