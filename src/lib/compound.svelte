<script lang="ts">
  import Ion from "./ion.svelte";
  import type { ion } from "./sol";
  export let ions: ion[];
  if (ions.length != 2) console.error("ion issues guy");

  const gcd = (x: number, y: number) => {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      let t = y;
      y = x % y;
      x = t;
    }
    return x;
  };

  let gcf: number;
  $: gcf = gcd(Math.abs(ions[0].charge), Math.abs(ions[1].charge));

  $: {
    console.log(ions.map((i) => i.charge));
    console.log(gcf);
  }
</script>

{#if Math.abs(Math.abs(ions[1].charge)) / gcf > 1 && ions[0].isCompound}
  (<Ion ion={ions[0]} />)
{:else}
  <Ion ion={ions[0]} />
{/if}
{#if Math.abs(ions[1].charge) / gcf > 1}
  <sub>{Math.abs(ions[1].charge) / gcf}</sub>
{/if}
{#if Math.abs(ions[0].charge) / gcf > 1 && ions[1].isCompound}
  (<Ion ion={ions[1]} />)
{:else}
  <Ion ion={ions[1]} />
{/if}
{#if Math.abs(ions[0].charge) / gcf > 1}
  <sub>{Math.abs(ions[0].charge) / gcf}</sub>
{/if}

<style>
</style>
