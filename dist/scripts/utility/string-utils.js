const stringUtils = {
    /**
     * Checks whether a given string is null, undefined, empty, or contains only whitespace.
     *
     * @param value - The string to check.
     * @returns True if the value is null, undefined, or an empty/whitespace-only string; false otherwise.
     */
    isStringNullOrEmpty(value) {
        return value === null || value === undefined || value.trim() === "";
    },
    /**
     * Converts a string to lowercase.
     *
     * @param value - The string to convert.
     * @returns The lowercase version of the string.
     */
    toLower(value) {
        return value.toLowerCase();
    },
    /**
     * Formats a date to a readable string format.
     *
     * @param date  - The date to format.
     * @example
     *
     * const date = new Date();
     * const formattedDate = stringUtils.formatDate(date);
     * console.log(formattedDate); // Output: "Oct 15, 2023"
     *
     * @returns A formatted date string.
     */
    formatDate(date) {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        return date.toLocaleDateString(undefined, options);
    },
};
export default stringUtils; // Export as default for easier import
//# sourceMappingURL=string-utils.js.map