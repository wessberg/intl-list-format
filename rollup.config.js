import {browsersWithSupportForEcmaVersion} from "@wessberg/browserslist-generator";
import ts from "@wessberg/rollup-plugin-ts";
import resolve from "rollup-plugin-node-resolve";
import multiEntry from "rollup-plugin-multi-entry";
import packageJson from "./package.json";

const SHARED_OPTIONS = {
	treeshake: true
};

export default [
	{
		...SHARED_OPTIONS,
		input: "src/index.ts",
		output: [
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: true
			}
		],
		plugins: [
			ts({
				transpiler: "babel",
				browserslist: browsersWithSupportForEcmaVersion("es2020")
			}),
			resolve()
		]
	},
	{
		...SHARED_OPTIONS,
		input: "src/index.ts",
		output: [
			{
				file: packageJson.main,
				format: "iife",
				sourcemap: true
			}
		],
		plugins: [
			ts({
				transpiler: "babel",
				browserslist: browsersWithSupportForEcmaVersion("es5")
			}),
			resolve()
		]
	},
	{
		...SHARED_OPTIONS,
		input: "src/index.ts",
		output: [
			{
				file: packageJson.minified,
				format: "iife",
				sourcemap: true
			}
		],
		plugins: [
			ts({
				transpiler: "babel",
				browserslist: browsersWithSupportForEcmaVersion("es5"),
				babelConfig: {
					comments: false,
					minified: true,
					compact: true,
					presets: [["minify", {builtIns: false}]]
				}
			}),
			resolve()
		]
	},
	{
		...SHARED_OPTIONS,
		input: [
			"src/test262.ts",
			"locale-data/en.js",
			"locale-data/en-GB.js",
			"locale-data/en-US.js",
			"locale-data/es.js",
			"locale-data/es-ES.js",
			"locale-data/de.js"
		],
		output: [
			{
				file: packageJson.test262,
				format: "iife",
				sourcemap: true
			}
		],
		plugins: [
			multiEntry(),
			ts({
				tsconfig: resolvedOptions => ({...resolvedOptions, declaration: false})
			}),
			resolve()
		]
	}
];
