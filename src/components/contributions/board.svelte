<script>
    import {
        buildDate,
        totalContributions,
        weeks,
    } from "../../../data/contributions.json";
</script>

<style>
    .board {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    .week {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .day {
        display: block;
        width: 15px;
        height: 15px;
        margin: 2px;
    }
</style>

<div class="wrapper">
    <h3>{totalContributions} contributions</h3>

    <div class="board">
        {#each weeks as week}
            <div class="week">
                {#each week as day}
                    <div
                        class="day"
                        style="background-color: {day.color}"
                        title="{day.date}: {day.totalContributions}
                        contributions" />
                {/each}
            </div>
        {/each}
    </div>
</div>
