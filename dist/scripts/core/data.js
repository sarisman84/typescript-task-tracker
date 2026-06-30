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
/**
 * Array to store all tasks.
 */
export const tasks = [];
export const taskLists = [];
export const app = document.getElementById("app");
//# sourceMappingURL=data.js.map