import DisciplineReporterPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface _DisciplineReporterSettings {
	"Your routines": string[];
}

const DEFAULT_SETTINGS: _DisciplineReporterSettings = {
	"Your routines": [],
};

export default class RoutinesInSetting extends PluginSettingTab {
	settings: DisciplineReporterSettings;
	plugin: DisciplineReporterPlugin;

	constructor(app: App, plugin: DisciplineReporterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
		this.loadSettings();
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
					await this.saveSettings();
				}).setIcon("save");
			});
	}

	async loadSettings() {
		try {
			this.plugin.settings = Object.assign(
				{},
				DEFAULT_SETTINGS,
				await this.plugin.loadData()
			);
		} catch (error) {
			console.log(error);
		}
	}

	async saveSettings() {
		this.plugin.settings["Your routines"] = this.plugin.settings[
			"Your routines"
		].filter((x) => x.length != 0);

		await this.plugin.saveData(this.plugin.settings);
	}
}
