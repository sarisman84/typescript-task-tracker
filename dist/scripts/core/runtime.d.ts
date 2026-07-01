import type { TaskList } from "./data management/list-data.js";
import type { Task } from "./data management/task-data.js";
/**
 * Array to store all tasks.
 */
export declare const tasks: Task[];
export declare const taskLists: TaskList[];
export declare const app: HTMLDivElement | null;
export declare const runtime: {
    saveDataAndRefreshAppRenderer(): void;
    refreshAppRender(): void;
    saveAppData(): void;
};
//# sourceMappingURL=runtime.d.ts.map