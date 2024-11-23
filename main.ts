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


interface DisciplineReporterSettings {
	"Your routine": string[];
}

const DEFAULT_SETTINGS: DisciplineReporterSettings = {
	"Your routine": [],
};

//#endregion

export default class DisciplineReporterPlugin extends Plugin {
	settings: DisciplineReporterSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new RoutinesInSetting(this.app, this));

		this.addRibbonIcon("dice", "Greet", () => {
			new Notice("Hello, world!");
			this.app.vault.create(
				"pluginTestFile.md",
				"this is data to that file"
			);
		});


		//? hotreload plugin installed https://github.com/pjeby/hot-reload.git


		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		this.addStatusBarItem().setText("Hi");


		this.addCommand({
			id: "open-routine-recorder-file",
			name: "Open routine recorder file",
			callback: () => new Files(this.app).CreateRoutinesTrackingFile(),
		});



		this.registerInterval(
			window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
		);
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
	}
}


		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.addText((text) =>
				text
					})
	}
}
