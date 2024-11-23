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


	async onload() {
		await this.loadSettings();

		this.addRibbonIcon("dice", "Greet", () => {
			new Notice("Hello, world!");
		});



		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.

		this.addCommand({
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
		await this.saveData(this.settings);
	}
}

	constructor(app: App) {
		super(app);
	}
	}

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
