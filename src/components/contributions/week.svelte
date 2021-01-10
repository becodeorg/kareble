<script>
    /* becodeorg/kareble
     *
     * /src/components/contributions/week.svelte - Contributions Component: week
     *
     * coded by leny@BeCode
     * started at 27/05/2019
     */

    import dayjs from "dayjs";

    import Day from "./day.svelte";

    export let days;
    export let prevWeekMonth = null;
    export let selectedDay;
    export let onHoverDay;
    export let onSelectDay;

    $: firstDay = dayjs(days[0].date, "YYYY-MM-DD");
</script>

<style>
    .week {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .label {
        position: absolute;
        width: 4rem;
        top: 1rem;
        left: -5rem;
        font-size: 1.5rem;
        color: #243a5b;
        text-align: right;
    }

    @media screen and (min-width: 768px) {
        .week {
            flex-direction: column;
            justify-content: space-between;
            width: 1.92%;
        }

        .label {
            top: -1.5rem;
            left: 0;
            font-size: 1rem;
            text-align: left;
        }
    }
</style>

<div class="week">
    {#if firstDay.month() !== prevWeekMonth}
        <strong class="label"> {firstDay.format("MMM")} </strong>
    {/if}
    {#each days as day}
        <Day {day} {selectedDay} {onSelectDay} {onHoverDay} />
    {/each}
</div>
