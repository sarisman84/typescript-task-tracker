import type { Tag, Task } from "../core/data.js";
export type DrawTaskCardDesc = {
    content: string;
    tags: Tag[];
    date: Date;
    id: string;
};
export declare function drawTaskCard(task: Task): HTMLFormElement;
//# sourceMappingURL=task-card.d.ts.map