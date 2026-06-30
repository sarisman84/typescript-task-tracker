import { drawContextMenu, } from "./components/context-menu.js";
import { renderEmptyState } from "./core/render.js";
const option = {
    label: "Test",
    event: () => {
        console.log("test");
    },
};
renderEmptyState(true);
drawContextMenu([option, option]);
//# sourceMappingURL=main.js.map