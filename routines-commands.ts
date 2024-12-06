import DisciplineReporterPlugin from "main";
import Files from "routines-dailyFileClass";

interface _CommandsInfo {
	[commandNames: string]: {
		id: string;
		name: string;
		callback: () => void;
	};
}
