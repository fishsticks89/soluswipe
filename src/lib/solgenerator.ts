import type { generator } from "./generator";
import table, { done, xLabels, yLabels } from "./sol"

let tb = table;

let getIndex = (table: number[][]): { x: number, y: number, cleanup: () => void } => {
    const y = Math.floor(Math.random() * table.length)
    const x = Math.floor(Math.random() * table[y].length)

    if (table[y][x] != done)
        return { x, y, cleanup: () => { table[y][x] = done } }
    else
        return getIndex(table)

}

const solGenerator: generator = () => {
    const { x, y, cleanup } = getIndex(tb);

    const options = ["", "soluble", "insoluble", "nonexistent"]
    const answer = tb[y][x]
    const question = [xLabels[x], yLabels[y]]

    cleanup();

    let soldone = true;

    tb.forEach((y) => {
        y.forEach((x) => {
            if (x !== done)
                soldone = false;
        })
    })

    return {options, question, answer, done: soldone}
}

export default solGenerator;