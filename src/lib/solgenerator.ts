import type { generator } from "./generator";
import table, { soluble, insoluble, semisoluble, nonexistent, done, xLabels, yLabels } from "./sol"

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

    const done = tb.filter(e => e.filter(f => f === 0).length === 0).length === 0;

    return {options, question, answer, done}
}

export default solGenerator;