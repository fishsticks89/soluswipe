<script lang="ts">
  import Ion from "./ion.svelte";
  import type { ion } from "./sol";
  export let ions: ion[];
  if (ions.length != 2) console.error("ion issues guy");

  const gcd = (num1: number, num2: number): number => {
    // if num2 is 0 return num1;
    if (num2 === 0) {
      return num1;
    }

    // call the same function recursively
    return gcd(num2, num1 % num2);
  };
  let lcm = (n1: number, n2: number) => {
    // Find the gcd first
    let thegcd = gcd(n1, n2);

    //then calculate the lcm
    return (n1 * n2) / thegcd;
  };

  const deltaCoulombs = gcd(Math.abs(ions[0].charge), Math.abs(ions[1].charge));
</script>

{#if Math.abs(deltaCoulombs % ions[1].charge) + 1 > 1 && ions[0].isCompound}
  (<Ion ion={ions[0]} />)
{:else}
  <Ion ion={ions[0]} />
{/if}
{#if (deltaCoulombs % ions[1].charge) + 1 > 1}
  <sub>{(deltaCoulombs % ions[1].charge) + 1}</sub>
{/if}
{#if Math.abs(deltaCoulombs % ions[0].charge) + 1 > 1 && ions[1].isCompound}
  (<Ion ion={ions[1]} />)
{:else}
  <Ion ion={ions[1]} />
{/if}
{#if (deltaCoulombs % ions[0].charge) + 1 > 1}
  <sub>{(deltaCoulombs % ions[0].charge) + 1}</sub>
{/if}

<style>
</style>
