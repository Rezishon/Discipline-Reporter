import DisciplineReporterPlugin from "main";
import { PluginSettingTab, Setting } from "obsidian";

//#region Setting interface
export interface _DisciplineReporterSettings {
	"Your routines": string[];
}

const DEFAULT_SETTINGS: _DisciplineReporterSettings = {
	"Your routines": [],
};
//#endregion

export default class RoutinesInSetting extends PluginSettingTab {
	//#region Init
	private plugin: DisciplineReporterPlugin;
	private SettingStrings = {
		//! the setting name couldn't change in some properties
		SettingName: "Your routines",
		SettingDesc: 'Add your routine and separate them with " , "',
		PlaceHolder: "Enter your routines",
		ButtonName: "save",
	};
	//#endregion

	//#region Constructor
	constructor(plugin: DisciplineReporterPlugin) {
		super(plugin.app, plugin);
		this.plugin = plugin;
		this.loadSettings();
	}
	//#endregion

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		//#region Builder
		try {
			new Setting(containerEl)
				.setName(this.SettingStrings.SettingName)
				.setDesc(this.SettingStrings.SettingDesc)
				.addText((text) =>
					text
						.setPlaceholder(this.SettingStrings.PlaceHolder)
						.setValue(
							this.plugin.settings["Your routines"].join(", ")
						)
						.onChange((value) => {
							this.plugin.settings["Your routines"] = value
								.split(",")
								.map((s) => s.trim());
						})
				)
				.addButton((btn) => {
					btn.onClick(async () => {
						await this.saveSettings();
					}).setIcon(this.SettingStrings.ButtonName);
				});
		} catch (error) {
			console.log(error);
		}
		//#endregion
	}

	//#region Method's of setting
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
	//#endregion
}
