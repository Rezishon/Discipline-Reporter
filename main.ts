import { Console } from "console";
import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";

var GlobalVariables = {
	routinesDailyTrackingFilePath: "Your-Daily-Routines.md",
	routinesDataFilePath: "Your-Data-Routines.md",
};

//#region Plugin Setting

interface DisciplineReporterSettings {
	"Your routines": string[];
}

const DEFAULT_SETTINGS: DisciplineReporterSettings = {
	"Your routines": [],
};

//#endregion

export default class DisciplineReporterPlugin extends Plugin {
	settings: DisciplineReporterSettings;

	async onload() {
		//#region App Main Starter Jobs

		await this.loadSettings();
		this.addSettingTab(new RoutinesInSetting(this.app, this));

		let files = new Files(this.app, this.settings, this.TodayDate());

		//#endregion

		//#region Ribbon Icon Setting

		this.addRibbonIcon("dice", "Greet", () => {});

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

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		this.settings["Your routines"] = this.settings["Your routines"].filter(
			(x) => x.length != 0
		);

		await this.saveData(this.settings);
	}

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

class Files extends Modal {
	setting: DisciplineReporterSettings;
	theDate: string[];

	constructor(
		app: App,
		settings: DisciplineReporterSettings,
		TheDate: string[]
	) {
		super(app);
		this.setting = settings;
		this.theDate = TheDate;
	}

	async CreateRoutinesDailyTrackingFile(): Promise<void> {
		try {
			await this.app.vault.create(
				GlobalVariables.routinesDailyTrackingFilePath,
				(await this.RoutinesDailyTrackingFileFormat()).toString()
			);
		} catch (error) {
			new Notice("The routines file was created");
		} finally {
			this.OpenRoutinesDailyTrackingFile();
		}
	}

	async OpenRoutinesDailyTrackingFile(): Promise<void> {
		this.app.workspace.openLinkText("", this.routinesTrackingFilePath);
	}

	async RoutinesDailyTrackingFileFormat(): Promise<string> {
		let outputString: string = `This is\n**${this.theDate[2]}/${this.theDate[1]}/${this.theDate[0]}**\nroutine file.\nFor each routine put a number in the showed bracket please.\n`;

		this.setting["Your routines"].forEach((routine) => {
			outputString += `- ${routine} : ()\n`.toString();
		});

		return outputString;
	}

	async CloseRoutinesDailyTrackingFile(): Promise<void> {
		//* save the data in tracking file
		//* build the report
		console.log(await this.OpenRoutinesData());
		this.DeleteRoutinesDailyTrackingFile();
	}

	async DeleteRoutinesDailyTrackingFile(): Promise<void> {
		if (
			await this.app.vault.adapter.exists(
				GlobalVariables.routinesDailyTrackingFilePath
			)
		) {
			await this.app.vault.delete(
				this.app.vault.getAbstractFileByPath(
					GlobalVariables.routinesDailyTrackingFilePath
				)!
			);
		}
	}

	async OpenRoutinesData(): Promise<object> {
		return await this.app.vault.adapter
			.read(GlobalVariables.routinesDataFilePath)
			.then((response) => {
				return JSON.parse(response);
			});
	}
}

// class SampleModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}

// 	CreateRoutinesFile() {
// 		this.app.vault.create("test.md", "this is a test file");
// 		const { contentEl } = this;
// 		contentEl.setText("Woah!");
// 	}

// 	onClose() {
// 		const { contentEl } = this;
// 		contentEl.empty();
// 	}
// }

class RoutinesInSetting extends PluginSettingTab {
	plugin: DisciplineReporterPlugin;

	constructor(app: App, plugin: DisciplineReporterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Your routines")
			.setDesc('Add your routine and separate them with " , "')
			.addText((text) =>
				text
					.setPlaceholder("Enter your routines")
					.setValue(this.plugin.settings["Your routines"].join(", "))
					.onChange((value) => {
						this.plugin.settings["Your routines"] = value
							.split(",")
							.map((s) => s.trim());
					})
			)
			.addButton((btn) => {
				btn.onClick(async () => {
					await this.plugin.saveSettings();
				}).setIcon("save");
			});
	}
}
