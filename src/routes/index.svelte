<script lang="ts">
    import Compound from "$lib/compound.svelte";
    import solGenerator from "$lib/solgenerator";
    import detect from "$lib/detect";
    import { browser } from "$app/env";
    import { fade, fly } from "svelte/transition";
    import type { ion } from "$lib/sol";

    let done = false;

    let q:
        | {
              done: boolean;
              options: string[];
              question: ion[];
              answer: number;
          }
        | undefined = solGenerator();

    let correct = 0;
    let total = 0;

    let [x, y] = [0, 0];

    if (browser)
        detect((key) => {
            if (done === false) {
                if (key != -1)
                    if (q && key === q.answer) {
                        if (key != -1) correct++;
                        total++;
                    } else {
                        total++;
                    }
                q = undefined;
                setTimeout(() => {
                    const br = solGenerator();
                    done = br.done;
                    [x, y] = [
                        br.answer === 1 || br.answer === 3
                            ? br.answer === 1
                                ? 100
                                : -100
                            : 0,
                        br.answer === 0 || br.answer === 2
                            ? br.answer === 2
                                ? 100
                                : -100
                            : 0,
                    ];
                    q = br;
                }, 300);
            }
        });
    let answers: string[] = [];
    $: if (q !== undefined) {
        answers = q.options;
    }
</script>

{#if done}
    <p class={"elem"}>🌟 {Math.round((correct / total) * 1000) / 10}% 🌟</p>
{:else}
    <p id={"correct"}>{Math.round((correct / total) * 1000) / 10}%</p>

    {#if browser}
        {#if q}
            <p
                class={"elem"}
                in:fade={{ duration: 200 }}
                out:fly={{
                    duration: 300,
                    x,
                    y,
                }}
            >
                <Compound ions={q.question} />
            </p>
        {/if}
    {/if}

    {#each answers as ans, index}
        <p
            class={index == 0
                ? "black"
                : index == 1
                ? "red"
                : index == 2
                ? "black"
                : "blue"}
            class:ans={true}
            style={index == 0
                ? "margin: 0rem; top: 5vh; left: 50vw; transform: translate(-50%, -0%);"
                : index == 1
                ? "margin: 0rem; top: 50vh; left: 95vw; transform: translate(-100%, -50%);"
                : index == 2
                ? "margin: 0rem; top: 95vh; left: 50vw; transform: translate(-50%, -100%);"
                : "margin: 0rem; top: 50vh; left: 5vw; transform: translate(-0%, -50%);"}
        >
            {ans}
        </p>
    {/each}
{/if}

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Mono:wght@300;700&display=swap");
    .red {
        color: hsl(0, 100%, 50%);
    }
    .blue {
        color: hsl(240, 100%, 50%);
    }
    .black {
        color: black;
    }
    p {
        font-family: Roboto;
        font-size: 4vw;
    }
    #correct {
        position: fixed;
        margin: 0px;
        padding: 0px;
        top: 5vh;
        left: 95vw;
        transform: translateX(-100%);
    }
    .ans {
        position: fixed;
        top: 50vh;
        left: 50vw;
    }
    .elem {
        position: fixed;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%, -50%);
        text-align: center;
        margin: 0px;
    }
</style>
