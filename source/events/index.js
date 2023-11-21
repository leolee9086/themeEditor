import { plugin } from "../asyncModules.js";
import { 保存 } from "../utils/files.js";
plugin.eventBus.on('save-all',保存)