<script>
    import {
        buildDate,
        totalMembers,
        totalContributions,
        weeks,
    } from "../../../data/contributions.json";

    let selectedDay = null;
</script>

<style>
    .board {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    h3 {
        margin-bottom: 0.5rem;
        font-size: 1.6rem;
        color: #16232e;
    }

    .week {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 1.92%;
    }

    .day {
        display: block;
        width: 100%;
        cursor: pointer;
        transition: opacity 0.25s ease-in-out;
    }

    .board.with-selection .day {
        opacity: 0.66;
    }

    .board.with-selection .day.selected {
        opacity: 1;
        outline: 2px solid #15232e;
    }

    .day:hover {
        opacity: 1;
    }

    .day {
        border: 1px solid white;
    }

    .day.highest rect {
        fill: #243a5b;
    }

    .day.high rect {
        fill: #50a7b2;
    }

    .day.mid rect {
        fill: #58c4d8;
    }

    .day.low rect {
        fill: #a1d8dd;
    }

    .day.lowest rect {
        fill: #eeeeee;
    }
</style>

<div class="wrapper">
    <h3>{totalContributions} contributions by {totalMembers} BeCodians</h3>

    <div class="board {selectedDay ? 'with-selection' : ''}">
        {#each weeks as week}
            <div class="week">
                {#each week as day}
                    <svg
                        viewbox="0 0 10 10"
                        on:click={() => {
                            selectedDay = selectedDay && selectedDay.date === day.date ? null : day;
                        }}
                        class="day {day.color}
                        {selectedDay && selectedDay.date === day.date ? 'selected' : ''}"
                        title="{day.date}: {day.totalContributions}
                        contributions">
                        <rect fill="black" width="10" height="10" />
                    </svg>
                {/each}
            </div>
        {/each}
    </div>

    {#if selectedDay && selectedDay.date}
        <div class="contributors">
            <h4>
                 {selectedDay.date}: {selectedDay.totalContributions}
                contributions by {selectedDay.members.length} BeCodians
            </h4>

            <ul>
                {#each selectedDay.members as [count, login]}
                    <li>
                        <a href="https://github.com/{login}">{login}</a>
                        ({count} contributions)
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>
