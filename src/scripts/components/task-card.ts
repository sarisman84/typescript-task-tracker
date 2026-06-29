import type { Tag, Task } from "../core/data.js";
import {
  htmlUtils,
  type HTMLContextMenu,
  type HTMLContextMenuOption,
} from "../utility/html-utils.js";
import stringUtils from "../utility/string-utils.js";

export type DrawTaskCardDesc = {
  content: string;
  tags: Tag[];
  date: Date;
  id: string;
};

export function drawTaskCard(task: Task): HTMLFormElement {
  const { description, createdAt, tags, id } = task;

  const card: HTMLFormElement = htmlUtils.createElement("form", ["card"]);
  card.id = card.name = `card_${id}`;

  // Create card header and its related elements.
  const header: HTMLElement = htmlUtils.createElement("header", [
    "card__header",
  ]);
  {
    header.id = "card__header";

    const dateElement: HTMLParagraphElement = htmlUtils.createElement("p", [
      "card__date",
    ]);
    dateElement.id = "card__date";
    dateElement.textContent = stringUtils.formatDate(createdAt);

    const contextMenuOptions: HTMLContextMenuOption[] = [
      { name: "Delete", selectEvent: () => {} },
    ];
    const contextMenu: HTMLButtonElement = htmlUtils.createContextMenu(
      contextMenuOptions,
      "card__context-menu",
      { button: ["card__context-menu"], menu: [], options: [] },
    );

    header.append(dateElement, contextMenu);
  }

  //Create card body and its related elements
  const body: HTMLElement = htmlUtils.createElement("div", ["card__body"]);
  {
    const label: HTMLLabelElement = htmlUtils.createElement("label", [
      "sc-only",
    ]);
    label.id = "task-card__label";
    label.textContent = "Description";

    const textArea: HTMLTextAreaElement = htmlUtils.createElement("textarea", [
      "task-card__content",
    ]);

    textArea.id = "card__content";
    textArea.textContent = description;

    label.setAttribute("for", "card__content");

    body.append(label, textArea);
  }

  // Create card footer and its related elements.
  const footer: HTMLElement = htmlUtils.createElement("footer", [
    "card__footer",
  ]);
  {
    const tagElements = tags.map((tag: Tag, index: number) => {
      const element: HTMLSpanElement = htmlUtils.createElement("span", [
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
