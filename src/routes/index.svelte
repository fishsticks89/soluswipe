<!-- <script context="module">
    export const prerender = false;
</script> -->
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
    let correctans: boolean | undefined = undefined;
    let correct = 0;
    let total = 0;

    let [x, y] = [0, 0];

    let detecterFunc: (key: number) => void;

    if (browser) {
        detecterFunc = (key: number) => {
            if (done === false) {
                if (key != -1)
                    if (q && key === q.answer) {
                        correctans = true;
                        correct++;
                        total++;
                    } else {
                        correctans = false;
                        total++;
                    }
                requestAnimationFrame(() => {
                    q = undefined;
                });
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
                    correctans = undefined;
                    q = br;
                }, 300);
            }
        };
        detect(detecterFunc);
    }
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
                class:red={correctans === false}
                class:green={correctans === true}
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
        <button
            on:click={() => {
                if (detecterFunc) detecterFunc(index);
            }}
            class={index == 0
                ? "black"
                : index == 1
                ? "red"
                : index == 2
                ? "black"
                : "blue"}
            class:ans={true}
            style={index == 0
                ? "top: 5vh; left: 50vw; transform: translate(-50%, -0%);"
                : index == 1
                ? "top: 50vh; left: 95vw; transform: translate(-100%, -50%);"
                : index == 2
                ? "top: 95vh; left: 50vw; transform: translate(-50%, -100%);"
                : "top: 50vh; left: 5vw; transform: translate(-0%, -50%);"}
        >
            <p>{ans}</p>
        </button>
    {/each}
{/if}

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Mono:wght@300;700&display=swap");
    button {
        outline: none;
        border: none;
        background: transparent;
        margin: 0px;
        padding: 0px;
    }
    .red {
        color: hsl(0, 100%, 50%);
    }
    .blue {
        color: hsl(240, 100%, 50%);
    }
    .green {
        color: hsl(120, 100%, 40%);
    }
    .black {
        color: black;
        /* color: white; */
    }
    p {
        font-family: Roboto;
        font-size: 4vw;
        margin: 0px;
        padding: 0px;
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
        margin: 0rem;
        padding: 0rem;
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
