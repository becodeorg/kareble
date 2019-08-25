<script>
    /* becodeorg/kareble
     *
     * /src/components/contributions/day.svelte - Contributions Component: day
     *
     * coded by leny@BeCode
     * started at 27/05/2019
     */

    import dayjs from "dayjs";

    export let day;
    export let selectedDay;
    export let onHoverDay;
    export let onSelectDay;

    $: selected = selectedDay && selectedDay.date === day.date;
    $: blurred = selectedDay && selectedDay.date !== day.date;
</script>

<style>
    .day {
        display: block;
        width: 100%;
        cursor: pointer;
        transition: opacity 0.25s ease-in-out;
        border: 2px solid white;
    }

    .blurred {
        opacity: 0.33;
    }

    .selected {
        opacity: 1;
        box-shadow: 0 0 0 2px white, 0 0 0 4px #243a5b;
    }

    .day:hover {
        opacity: 1;
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

    @media screen and (min-width: 768px) {
        .day {
            border: 1px solid white;
        }

        .selected {
            box-shadow: 0 0 0 1px white, 0 0 0 2px #243a5b;
        }
    }
</style>

<span
    class="day {day.color}"
    class:selected
    class:blurred
    on:mouseover={() => onHoverDay(day)}
    title="{dayjs(day.date, 'YYYY-MM-DD').format('DD MMMM YYYY')}:
    {day.totalContributions} contribution{day.totalContributions > 1 ? 's' : ''}">
    <svg viewbox="0 0 10 10" on:click={() => onSelectDay(day)}>
        <rect fill="black" width="10" height="10" />
    </svg>
</span>
