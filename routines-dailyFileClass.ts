export default class Files extends Modal {
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
		this.app.workspace.openLinkText(
			GlobalVariables.routinesDailyTrackingFilePath,
			GlobalVariables.routinesDailyTrackingFilePath
		);
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

	async CreateRoutinesData(): Promise<void> {
		await this.app.vault.create(
			GlobalVariables.routinesDataFilePath,
			JSON.stringify(new Object())
		);
	}

	async WriteRoutinesData(newValue: object): Promise<void> {
		console.log(JSON.stringify(newValue));
		await this.app.vault.adapter.write(
			GlobalVariables.routinesDataFilePath,
			JSON.stringify(newValue)
		);
	}

	async EditRoutinesData(): Promise<void> {
		let data: RoutinesData = await this.OpenRoutinesData();

		console.log(data);
	}

	async OpenRoutinesData(): Promise<RoutinesData> {
		return await this.app.vault.adapter
			.read(GlobalVariables.routinesDataFilePath)
			.then((response) => {
				return JSON.parse(response);
			});
	}
}
