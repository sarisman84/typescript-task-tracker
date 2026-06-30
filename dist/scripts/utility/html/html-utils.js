import stringUtils from "../string-utils.js";
export {};
export const htmlUtils = {
    /**
     * Creates a new DOM element of the specified type with the given CSS classes.
     *
     * @param type - The tag name of the element to create (e.g., 'div', 'span', 'button').
     * @param classList - An optional array of CSS class names to apply to the element.
     * @returns The newly created HTMLElement, cast to the specified type T.
     */
    createElement(type, classList = []) {
        const element = document.createElement(type);
        if (!element) {
            throw new Error(`Failed to create element of type ${type}`);
        }
        if (classList && classList.length > 0) {
            element.classList.add(...classList); // Add all classes to the element
        }
        registerEventListeners(element);
        return element;
    },
    createForm(classList = []) {
        return this.createElement("form", classList);
    },
    createInput(classList = []) {
        return this.createElement("input", classList);
    },
    createLabel(classList = []) {
        return this.createElement("label", classList);
    },
    /**
     * Creates a dropdown (select) element with the given options and change handler.
     *
     * @param classList - An optional array of CSS class names to apply to the select element.
     * @param options - An array of strings representing the available options in the dropdown.
     * @param selectedValue - The value to initially select. Defaults to the first option if not provided or empty.
     * @param onChange - A callback function invoked when the user selects a different option. Receives the selected value as its argument.
     * @returns The newly created HTMLSelectElement with the specified options and change listener.
     */
    createDropdown(classList = [], options, selectedValue = "", onChange) {
        const select = document.createElement("select");
        select.classList.add(...classList);
        select.value = selectedValue ?? options[0] ?? "";
        options.forEach((value) => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            select.append(option);
        });
        select.addEventListener("change", (event) => {
            const target = event.target;
            if (!target.selectedOptions.length)
                return;
            if (!target.selectedOptions[0])
                return;
            onChange?.(target.selectedOptions[0].text);
        });
        return select;
    },
    createContextMenu(options, id = "", classList) {
        const menu = htmlUtils.createElement("ul", [
            "context-menu",
            ...classList.menu,
        ]);
        {
            const liElements = options.map((option) => {
                const element = htmlUtils.createElement("li");
                const button = htmlUtils.createElement("button", [
                    "context-menu__option-button",
                    ...classList.options,
                ]);
                element.id = stringUtils.toLower(option.name);
                button.id = "context-menu__menu__option-button";
                button.addEventListener("click", () => {
                    option.selectEvent();
                    menu.setAttribute("data-state", "close");
                });
                element.append(button);
                return element;
            });
            menu.append(...liElements);
            const button = htmlUtils.createElement("button", [
                "context-menu__button",
                ...classList.button,
            ]);
            {
                button.id = stringUtils.isStringNullOrEmpty(id)
                    ? "context-menu__button"
                    : id;
                button.addEventListener("click", () => {
                    menu.setAttribute("data-state", "open");
                });
                button.append(menu);
            }
            return button;
        }
    },
};
/**
 * Registers event listeners for an HTMLElement based on its type.
 *
 * This function sets up all the event listener methods (e.g., onClick, onInput)
 * that are defined in the global HTMLElement interface. It allows for
 * consistent and typed event handling across different elements.
 *
 * @param element - The HTMLElement to register event listeners on.
 */
function registerEventListeners(element) {
    element.events = {
        // --- Mouse Events ---
        onClick: (callback) => {
            element.addEventListener("click", callback);
        },
        onDblClick: (callback) => {
            element.addEventListener("dblclick", callback);
        },
        onAuxClick: (callback) => {
            element.addEventListener("auxclick", callback);
        },
        onContextMenu: (callback) => {
            element.addEventListener("contextmenu", callback);
        },
        onMouseDown: (callback) => {
            element.addEventListener("mousedown", callback);
        },
        onMouseUp: (callback) => {
            element.addEventListener("mouseup", callback);
        },
        onMouseMove: (callback) => {
            element.addEventListener("mousemove", callback);
        },
        onMouseOver: (callback) => {
            element.addEventListener("mouseover", callback);
        },
        onMouseLeave: (callback) => {
            element.addEventListener("mouseleave", callback);
        },
        // --- Keyboard Events ---
        onKeyDown: (callback) => {
            element.addEventListener("keydown", callback);
        },
        onKeyPress: (callback) => {
            element.addEventListener("keypress", callback);
        },
        onKeyUp: (callback) => {
            element.addEventListener("keyup", callback);
        },
        // --- Form Events ---
        onInput: (callback) => {
            element.addEventListener("input", callback);
        },
        onChange: (callback) => {
            element.addEventListener("change", callback);
        },
        onFocus: (callback) => {
            element.addEventListener("focus", callback);
        },
        onBlur: (callback) => {
            element.addEventListener("blur", callback);
        },
        onValueChanged: (callback) => {
            element.addEventListener("change", callback);
        },
        onSubmit: (callback) => {
            element.addEventListener("submit", callback);
        },
        // --- Drag and Drop Events ---
        onDrag: (callback) => {
            element.addEventListener("drag", callback);
        },
        onDragEnd: (callback) => {
            element.addEventListener("dragend", callback);
        },
        onDragEnter: (callback) => {
            element.addEventListener("dragenter", callback);
        },
        onDragLeave: (callback) => {
            element.addEventListener("dragleave", callback);
        },
        onDragOver: (callback) => {
            element.addEventListener("dragover", callback);
        },
        onDragStart: (callback) => {
            element.addEventListener("dragstart", callback);
        },
        onDrop: (callback) => {
            element.addEventListener("drop", callback);
        },
        // --- Clipboard Events ---
        onCopy: (callback) => {
            element.addEventListener("copy", callback);
        },
        onCut: (callback) => {
            element.addEventListener("cut", callback);
        },
        onPaste: (callback) => {
            element.addEventListener("paste", callback);
        },
        // --- Window Events ---
        onLoad: (callback) => {
            element.addEventListener("load", callback);
        },
        onError: (callback) => {
            element.addEventListener("error", callback);
        },
        onResize: (callback) => {
            element.addEventListener("resize", callback);
        },
        onScroll: (callback) => {
            element.addEventListener("scroll", callback);
        },
        onWheel: (callback) => {
            element.addEventListener("wheel", callback);
        },
        // --- Touch Events ---
        onTouchStart: (callback) => {
            element.addEventListener("touchstart", callback);
        },
        onTouchEnd: (callback) => {
            element.addEventListener("touchend", callback);
        },
        onTouchMove: (callback) => {
            element.addEventListener("touchmove", callback);
        },
        onTouchCancel: (callback) => {
            element.addEventListener("touchcancel", callback);
        },
    };
}
//# sourceMappingURL=html-utils.js.map