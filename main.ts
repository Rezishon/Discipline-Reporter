//#region Imports
import { Plugin } from "obsidian";
import CommandsHandler from "routines-commands";
import Files from "routines-dailyFileClass";
import RoutinesInSetting, {
	DisciplineReporterSettings,
} from "routines-settingClass";
//#endregion

export var GlobalVariables = {
	routinesDailyTrackingFilePath: "Your-Daily-Routines.md",
	routinesDataFilePath: "Your-Data-Routines.md",
};

export default class DisciplineReporterPlugin extends Plugin {
	settings: DisciplineReporterSettings;

	async onload() {
		//#region App Main Starter Jobs

		this.addSettingTab(new RoutinesInSetting(this.app, this));

		let files = new Files(this.app, this.settings, this.TodayDate());

		//#endregion

		//#region Ribbon Icon Setting

		this.addRibbonIcon("dice", "Greet", async () => {
			console.log(this.settings);
			// await files.WriteRoutinesData(testData);
			// console.log(await files.OpenRoutinesData());

			// await files.EditRoutinesData();
			// console.log(await files.OpenRoutinesData());
		});

		//#endregion

		//? hotreload plugin installed https://github.com/pjeby/hot-reload.git

		//#region Status Bar Setting

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		this.addStatusBarItem().setText("Hi");

		//#endregion

		//#region Commands

		this.addCommand({
			id: "open-routine-recorder-file",
			name: "Open routine recorder file",
			callback: () => files.CreateRoutinesDailyTrackingFile(),
		});

		this.addCommand({
			id: "save&close-routine-recorder-file",
			name: "Save & close routine recorder file",
			callback: () => files.CloseRoutinesDailyTrackingFile(),
		});

		//#endregion

		//#region Interval

		this.registerInterval(
			window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
		);

		//#endregion
	}

	// ! should replaced
	TodayDate(): string[] {
		let date = new Date();

		let theDateIs: string[] = [
			date.toLocaleString(navigator.languages, {
				day: "numeric",
			}),
			date.toLocaleString(navigator.languages, {
				month: "numeric",
			}),
			date.toLocaleString(navigator.languages, {
				year: "numeric",
			}),
		];

		return theDateIs;
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
