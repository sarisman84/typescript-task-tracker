import {
  drawContextMenu,
  type ContextMenuOption,
} from "./components/context-menu.js";
import { renderEmptyState } from "./core/render.js";

const option: ContextMenuOption = {
  label: "Test",
  event: () => {
    console.log("test");
  },
};

renderEmptyState(true);
drawContextMenu([option, option]);
