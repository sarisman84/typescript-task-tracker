import { htmlUtils, } from "../utility/html-utils.js";
import stringUtils from "../utility/string-utils.js";
export function drawTaskCard(task) {
    const { description, createdAt, tags, id } = task;
    const card = htmlUtils.createElement("form", ["card"]);
    card.id = card.name = `card_${id}`;
    // Create card header and its related elements.
    const header = htmlUtils.createElement("header", [
        "card__header",
    ]);
    {
        header.id = "card__header";
        const dateElement = htmlUtils.createElement("p", [
            "card__date",
        ]);
        dateElement.id = "card__date";
        dateElement.textContent = stringUtils.formatDate(createdAt);
        const contextMenuOptions = [
            { name: "Delete", selectEvent: () => { } },
        ];
        const contextMenu = htmlUtils.createContextMenu(contextMenuOptions, "card__context-menu", { button: ["card__context-menu"], menu: [], options: [] });
        header.append(dateElement, contextMenu);
    }
    //Create card body and its related elements
    const body = htmlUtils.createElement("div", ["card__body"]);
    {
        const label = htmlUtils.createElement("label", [
            "sc-only",
        ]);
        label.id = "task-card__label";
        label.textContent = "Description";
        const textArea = htmlUtils.createElement("textarea", [
            "task-card__content",
        ]);
        textArea.id = "card__content";
        textArea.textContent = description;
        label.setAttribute("for", "card__content");
        body.append(label, textArea);
    }
    // Create card footer and its related elements.
    const footer = htmlUtils.createElement("footer", [
        "card__footer",
    ]);
    {
        const tagElements = tags.map((tag, index) => {
            const element = htmlUtils.createElement("span", [
                "card__tag",
            ]);
            element.id = `card__tag-${index}`; // Use index as ID for simplicity
            element.textContent = tag.name;
            element.setAttribute("data-tag-color", tag.color);
            return element;
        });
        footer.append(...tagElements);
    }
    card.append(header, body, footer);
    return card;
}
//# sourceMappingURL=task-card.js.map