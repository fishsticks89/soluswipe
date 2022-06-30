<script lang="ts">
    import type { ion } from "./sol";

    export let ion: ion;
    ion.symbol.split("");
</script>

{#each ion.symbol.split("") as letter}
    {#if letter.match(/[0-9]/i)}
        <sub>{letter}</sub>
    {:else}
        {letter}
    {/if}
{/each}

<!-- <sup>
    {#if Math.abs(ion.charge) !== 1 && Math.abs(ion.charge) !== 0}
        {Math.abs(ion.charge)}
    {/if}
    {#if ion.charge != 0}
        {ion.charge > 0 ? "+" : "-"}
    {/if}
</sup> -->

<style>
</style>
