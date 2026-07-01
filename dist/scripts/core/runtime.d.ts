import type { TaskList } from "./data management/list-data.js";
import type { Task } from "./data management/task-data.js";
import type { Bindable } from "./types.js";
/**
 * Array to store all tasks.
 */
export declare const tasks: Bindable<Task[]>;
export declare const taskLists: Bindable<TaskList[]>;
export declare const app: HTMLDivElement | null;
export declare const pageRoot: HTMLElement | null;
export declare const runtime: {
    saveDataAndRefreshAppRenderer(): void;
    refreshAppRender(): void;
    saveAppData(): void;
};
//# sourceMappingURL=runtime.d.ts.map