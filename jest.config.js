/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	testEnvironment: "node",
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	// automock: true,
	moduleNameMapper: {
		"^obsidian$": "<rootDir>/node_modules/obsidian/obsidian.d.ts",
		"@codemirror": "<rootDir>/node_modules/@codemirror/",
	},
};
