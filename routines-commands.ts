import DisciplineReporterPlugin from "main";
import Files from "routines-dailyFileClass";

//#region Commands interface
interface _CommandsInfo {
	[commandNames: string]: {
		id: string;
		name: string;
		callback: () => void;
	};
}
//#endregion
