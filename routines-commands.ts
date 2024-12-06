import DisciplineReporterPlugin from "main";
import Files from "routines-dailyFileClass";

//#region Commands interface
interface _CommandsInfo {
	[commandNames: string]: {
		id: string;
		name: string;
		callback: () => void;
	};
}
//#endregion

export default class CommandsHandler {
	//#region Init
	private plugin: DisciplineReporterPlugin;
	private files: Files;
	//#endregion

	constructor(plugin: DisciplineReporterPlugin, files: Files) {
		this.plugin = plugin;
		this.files = files;

		var commandsInfo: _CommandsInfo = {
		};
	}
}
