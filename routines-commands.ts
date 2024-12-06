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

	//#region Constructor
	constructor(plugin: DisciplineReporterPlugin, files: Files) {
		this.plugin = plugin;
		this.files = files;

		//#region Commands List
		var commandsInfo: _CommandsInfo = {
			Opener: {
				id: "open-routine-recorder-file",
				name: "Open routine recorder file",
				callback: () => this.files.CreateRoutinesDailyTrackingFile(),
			},
			"Save&Closer": {
				id: "save&close-routine-recorder-file",
				name: "Save & close routine recorder file",
				callback: () => this.files.CloseRoutinesDailyTrackingFile(),
			},
		};
		//#endregion

		this.CommandsBuilder(commandsInfo);
	}
	//#endregion

	private async CommandsBuilder(commandsInfo: _CommandsInfo): Promise<void> {
	}
}
