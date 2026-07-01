import { htmlUtils } from "../utility/html/html-utils.js";
import stringUtils from "../utility/string-utils.js";
export {};
export const UUID = {
    empty: "00000000-0000-0000-0000-000000000000",
    isValid(uuid) {
        return (uuid.length === 36 &&
            !stringUtils.isStringNullOrEmpty(uuid) &&
            !uuid.match(this.empty));
    },
    new() {
        return crypto.randomUUID(); // TODO: Use a proper UUID generator library like 'uuid' or 'nanoid' instead of crypto.randomUUID() for better compatibility and performance.
    },
};
export const STATUS_MESSAGES = {
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
//# sourceMappingURL=types.js.map