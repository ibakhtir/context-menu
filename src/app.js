import "./styles.css";
import { ContextMenu } from "./menu";

const contextMenu = new ContextMenu(".menu");

contextMenu.add();
contextMenu.open();
contextMenu.trigger();
