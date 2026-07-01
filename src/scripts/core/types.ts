import { htmlUtils } from "../utility/html/html-utils.js";
import stringUtils from "../utility/string-utils.js";
import type { TaskList } from "./data management/list-data.js";
import type { Task } from "./data management/task-data.js";

export {};

/**
 * Represents the status of a task.
 */

export type Color =
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "orange"
  | "pink"
  | "gray"
  | "black"
  | "white";

export type Tag = {
  name: string;
  color: Color;
  id: UUID;
};

export type UUID = string;
export const UUID = {
  empty: "00000000-0000-0000-0000-000000000000",
  isValid(uuid: string): boolean {
    return (
      uuid.length === 36 &&
      !stringUtils.isStringNullOrEmpty(uuid) &&
      !uuid.match(this.empty)
    );
  },

  new(): UUID {
    return crypto.randomUUID(); // TODO: Use a proper UUID generator library like 'uuid' or 'nanoid' instead of crypto.randomUUID() for better compatibility and performance.
  },
};

export interface Bindable<T> {
  value: T;
}

/**
 * Type for HTML elements that may be null.
 */
export type HTMLElementOrNull = HTMLLIElement | HTMLDivElement | null;

export type Status =
  | 200 // OK
  | 201 // Created
  | 204 // No Content
  | 301 // Moved Permanently
  | 302 // Found
  | 400 // Bad Request
  | 401 // Unauthorized
  | 403 // Forbidden
  | 404 // Not Found
  | 409 // Conflict
  | 422 // Unprocessable Entity
  | 500 // Internal Server Error
  | 502 // Bad Gateway
  | 503 // Service Unavailable
  | 504; // Gateway Timeout

export const STATUS_MESSAGES: Record<Status, string> = {
  200: "OK",
  201: "Created",
  204: "No Content",
  301: "Moved Permanently",
  302: "Found",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  422: "Unprocessable Entity",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};
