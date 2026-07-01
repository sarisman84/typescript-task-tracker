export {};
/**
 * Represents the status of a task.
 */
export type Color = "red" | "blue" | "green" | "yellow" | "purple" | "orange" | "pink" | "gray" | "black" | "white";
export type Tag = {
    name: string;
    color: Color;
    id: UUID;
};
export type UUID = string;
export declare const UUID: {
    empty: string;
    isValid(uuid: string): boolean;
    "new"(): UUID;
};
/**
 * Type for HTML elements that may be null.
 */
export type HTMLElementOrNull = HTMLLIElement | HTMLDivElement | null;
export type Status = 200 | 201 | 204 | 301 | 302 | 400 | 401 | 403 | 404 | 409 | 422 | 500 | 502 | 503 | 504;
export declare const STATUS_MESSAGES: Record<Status, string>;
//# sourceMappingURL=types.d.ts.map