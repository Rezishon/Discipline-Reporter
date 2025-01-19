//#region Imports
import { Plugin } from "obsidian";
import CommandsHandler from "Repository/routines-commands";
import Files from "Repository/routines-dailyFileClass";
import RoutinesInSetting, {
	_DisciplineReporterSettings,
} from "Repository/routines-settingClass";
//#endregion

export var GlobalVariables = {
	routinesDailyTrackingFilePath: "Your-Daily-Routines.md",
	routinesDataFilePath: "Your-Data-Routines.md",
};

// * hotreload plugin installed https://github.com/pjeby/hot-reload.git

export default class DisciplineReporterPlugin extends Plugin {
	settings: _DisciplineReporterSettings;

	async onload() {
		//#region App Main Starter Jobs
		this.addSettingTab(new RoutinesInSetting(this));

		let files = new Files(this.app, this.settings);

		let commands = new CommandsHandler(this, files);
		//#endregion

		//#region Ribbon Icon Setting
		this.addRibbonIcon("dice", "Greet", async () => {
			// await files.WriteRoutinesData(testData);
			// console.log(await files.OpenRoutinesData());
			// await files.EditRoutinesData();
			// console.log(await files.OpenRoutinesData());
		});
		//#endregion

		//#region Status Bar Setting
		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		this.addStatusBarItem().setText("Hi");
		//#endregion

		//#region Interval
		this.registerInterval(
			window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
		);
		//#endregion
	}
}

// class SampleModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}

// 	CreateRoutinesFile() {
// 		this.app.vault.create("test.md", "this is a test file");
// 		const { contentEl } = this;
// 		contentEl.setText("wow!");
// 	}

// 	onClose() {
// 		const { contentEl } = this;
// 		contentEl.empty();
// 	}
// }
