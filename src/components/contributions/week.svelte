<script>
    /* becodeorg/kareble
     *
     * /src/components/contributions/week.svelte - Contributions Component: week
     *
     * coded by leny@BeCode
     * started at 27/05/2019
     */

    import {DateTime} from "luxon";

    import Day from "./day.svelte";

    export let index;
    export let days;
    export let prevWeekMonth = null;
    export let selectedDay;
    export let onSelectDay;

    $: firstDay = DateTime.fromFormat(days[0].date, "yyyy-MM-dd");
</script>

<style>
    .week {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 1.92%;
    }

    .label {
        position: absolute;
        top: -1.5rem;
        left: 0;
        font-size: 1rem;
        color: #243a5b;
    }
</style>

<div class="week">
    {#if firstDay.month !== prevWeekMonth}
        <strong class="label"> {firstDay.monthShort} </strong>
    {/if}
    {#each days as day}
        <Day {day} {selectedDay} {onSelectDay} />
    {/each}
</div>
