import stringUtils from "../string-utils.js";
export {};
export const extensions = {
    applyNodeListOfExtensions(value) {
        value.toArray = () => Array.from(value.values());
    },
};
export const htmlUtils = {
    /**
     * Creates a new DOM element of the specified type with the given CSS classes.
     *
     * @param type - The tag name of the element to create (e.g., 'div', 'span', 'button').
     * @param classList - An optional array of CSS class names to apply to the element.
     * @returns The newly created HTMLElement, cast to the specified type T.
     */
    createElement(type, id, classList = []) {
        const element = document.createElement(type);
        if (id)
            element.id = id; // Set the ID if provided
        if (classList && classList.length > 0) {
            const normalClasses = classList.filter((cls) => !cls.startsWith("fa-"));
            element.classList.add(...normalClasses); // Add all classes to the element
            const fontAwesomeClasses = classList.filter((cls) => cls.startsWith("fa-"));
            if (fontAwesomeClasses.length > 0) {
                const iconElement = document.createElement("i");
                iconElement.id = `${id}-icon`;
                iconElement.classList.add(...fontAwesomeClasses); // Add all FA classes to the icon element
                element.append(iconElement); // Append the icon element to the main element
            }
        }
        return element;
    },
    createForm(id, classList = []) {
        return this.createElement("form", id, classList);
    },
    createInput(id, classList = []) {
        return this.createElement("input", id, classList);
    },
    createLabel(id, classList = []) {
        return this.createElement("label", id, classList);
    },
    getElementById(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`[Error][htmlUtils.getElementById]: No element found with ID "${id}"`);
            return null;
        }
        return element;
    },
    querySelector(selector, root = document) {
        return root.querySelector(selector);
    },
    querySelectorAll(selector, root = document) {
        const result = root.querySelectorAll(selector);
        extensions.applyNodeListOfExtensions(result);
        return result.toArray();
    },
};
//# sourceMappingURL=html-utils.js.map