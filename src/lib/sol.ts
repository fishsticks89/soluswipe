const [d, s, i, m, b] = [0, 1, 2, 1, 3];

export interface ion {
    symbol: string;
    charge: number;
    isCompound?: boolean;
}

const o = (symbol: string, charge: number, isCompound = false): ion => { return { symbol, charge, isCompound } };

const yLabels: ion[] = [o("F", -1), o("Cl", -1), o("Br", -1), o("I", -1), o("OH", -1, true), o("S", -2), o("SO4", -2, true), o("CO3", -2, true), o("NO3", -2, true), o("PO4", -3, true), o("CrO4", -2, true), o("CH3CO2", -1, true)];
const xLabels: ion[] = [o("NH4", 1, true), o("Li", 1), o("Na", 1), o("K", 1), o("Mg", 2), o("Ca", 2), o("Ba", 2), o("Al", 3), o("Fe", 3), o("Cu", 2), o("Ag", 1), o("Zn", 2), o("Pb", 2), ];

const table: (number)[][] = [
    [s, s, s, s,  i, i, m, s,  m, s, s, s, m],
    [s, s, s, s,  s, s, s, s,  s, s, i, s, s],
    [s, s, s, s,  s, s, s, s,  s, s, i, s, s],

    [s, s, s, s,  s, s, s, s,  b, b, i, s, i],
    [s, s, s, s,  i, m, s, i,  i, i, b, i, i],
    [s, s, s, s,  b, s, b, b,  i, i, i, i, i],

    [s, s, s, s,  m, i, s, s,  s, s, m, s, i],
    [s, s, s, s,  i, i, i, b,  b, b, i, i, i],
    [s, s, s, s,  s, s, s, s,  s, s, s, s, s],

    [s, s, s, s,  i, i, i, i,  i, i, i, i, i],
    [s, s, s, s,  s, s, i, b,  i, i, i, i, i],
    [s, s, s, s,  s, s, s, s,  s, s, s, s, s],
]

export { s as soluble, i as insoluble, m as semisoluble, b as nonexistent, d as done, xLabels, yLabels };

export default table;