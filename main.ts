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
		const routinesTrackingFilePath: string = "file2.md";

		await this.loadSettings();
		this.addSettingTab(new RoutinesInSetting(this.app, this));

		//#endregion

		//#region Ribbon Icon Setting

		this.addRibbonIcon("dice", "Greet", () => {
			new Notice("Hello, world!");
			this.app.vault.create(
				"pluginTestFile.md",
				"this is data to that file"
			);
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
			callback: () => new Files(this.app).CreateRoutinesTrackingFile(),
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
		this.settings["Your routine"] = this.settings["Your routine"].filter(
			(x) => x.length != 0
		);

		await this.saveData(this.settings);
	}
}

class Files extends Modal {
	constructor(app: App) {
		super(app);
	}
	async CreateRoutinesTrackingFile(): Promise<void> {
		await this.app.vault.create(
			".obsidian/plugins/Discipline-Reporter/.Routines-Tracking-file",
			"this is data to that file"
		);
	}
	async OpenRoutinesTrackingFile(): Promise<void> {}

	//* async RoutinesTrackingFileFormat(): Promise<void> {}
	//* Also add a interface for it. It would be cool

	async CloseRoutinesTrackingFile(): Promise<void> {
		//* save the data in tracking file
		//* build the report
		//* delete tracking file
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
