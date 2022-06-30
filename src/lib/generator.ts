import type { ion } from "./sol";

export type generator = () => {done: boolean, options: string[], question: ion[], answer: number}