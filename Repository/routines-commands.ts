import DisciplineReporterPlugin from "main";
import Files from "Repository/routines-dailyFileClass";

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
		try {
			const commandsInfo: _CommandsInfo = {
				Opener: {
					id: "open-routine-recorder-file",
					name: "Open routine recorder file",
					callback: async () =>
						await this.files.CreateRoutinesDailyTrackingFile(),
				},
				"Save&Closer": {
					id: "save&close-routine-recorder-file",
					name: "Save & close routine recorder file",
					callback: async () =>
						await this.files.CloseRoutinesDailyTrackingFile(),
				},
			};
			//#endregion

			this.CommandsBuilder(commandsInfo);
		} catch (error) {
			console.log(error);
		}
	}
	//#endregion

	//#region Methods
	private async CommandsBuilder(commandsInfo: _CommandsInfo): Promise<void> {
		try {
			for (const command in commandsInfo) {
				this.plugin.addCommand(commandsInfo[command]);
			}
		} catch (error) {
			console.log(error);
		}
	}
	//#endregion
}
