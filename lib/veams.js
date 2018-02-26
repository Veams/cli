/* ==============================================
 * Requirements
 * ============================================== */
const fsx = require('fs-extra');
const path = require('path');
const Insert = require('inserter');
const chalk = require('chalk');
const exec = require('child-process-promise').exec;
const Yeoman = require('yeoman-environment');
const updateNotifier = require('update-notifier');
const genPkg = require('../node_modules/@veams/generator-veams/package.json');
const inserterPkg = require('../node_modules/inserter/package.json');
const pkg = require('../package.json');
const helpers = require('./utils/helpers');
const scriptParser = require('./ast/script-parser');
const styleParser = require('./ast/style-parser');
const Env = Yeoman.createEnv();

/* ==============================================
 * Vars/ Configs
 * ============================================== */
const generatorPath = '@veams/generator-veams/generators/';
const Veams = {};

/**
 * Extension ID's
 */
Veams.extensions = {
	generatorId: 'veams-generator',
	componentId: 'veams-component',
	utilityId: 'veams-utility',
	componentsId: 'veams-components',
	methdologyId: 'veams-methodology'
};

/**
 * Generators
 */
Veams.generators = {
	standard: 'veams:app',
	blueprint: 'veams:blueprint'
};

/**
 * Generator paths
 */
Veams.generatorPath = [
	{
		path: generatorPath + 'app',
		cmd: Veams.generators.standard
	},
	{
		path: generatorPath + 'blueprint',
		cmd: Veams.generators.blueprint
	}
];

/**
 * Veams data
 */
Veams.DATA = {
	pkgManager: getPkgManager,
	projectConfig: getProjectConfig,
	configFile: getConfigFile,
	aliases: {
		cmds: {
			g: 'generate',
			h: 'help',
			i: 'install',
			n: 'new',
			u: 'update',
			v: 'version'
		},
		exts: {
			vc: Veams.extensions.componentId,
			vu: Veams.extensions.utilityId
		},
		types: {
			bp: 'blueprint',
			c: 'component',
			cu: 'custom',
			p: 'project',
			u: 'utility'
		}
	}
};

/* ==============================================
 * Functions
 * ============================================== */

async function getPkgManager() {
	let pkgManager = 'npm';

	try {
		let yarnExists = await helpers.fileExists(`${process.cwd()}/yarn.lock`);
		pkgManager = yarnExists ? 'yarn' : pkgManager;

		return pkgManager;
	} catch (e) {
		helpers.message('red', `@veams/cli :: getPkgManager() throws an error: ${e}`);

	}
}

function getConfigFile() {
	return JSON.parse(fsx.readFileSync(process.cwd() + '/veams-cli.json', 'utf-8'));
}

function getProjectConfig() {
	try {
		return getConfigFile();
	} catch (error) {
		helpers.message('red', `@veams/cli :: No config file found: ${error}`);
	}
}

/**
 * Register all generators
 */
Veams.generatorPath.forEach(function (gen) {
	Env.register(require.resolve(gen.path), gen.cmd);
});


async function installPkg(module, opts) {
	let pkgManager = await Veams.DATA.pkgManager();

	if (pkgManager === 'yarn') {
		return yarnInstall(module, opts);
	} else {
		return npmInstall(module, opts);
	}
}

/**
 * NPM Install function.
 *
 * @param {String} module - A module name
 * @param {String} opts - Options
 */
function npmInstall(module, opts) {
	return exec(`npm install ${module} ${opts}`);
}

/**
 * Yarn Install function.
 *
 * @param {String} module - A module name
 * @param {String} opts - Options
 */
function yarnInstall(module, opts) {
	let options = opts ? `${opts} --dev` : '--dev';

	return exec(`yarn add ${module} ${options}`);
}

/**
 * Environment check and generator start.
 *
 * @param {String} generatorName - Name of the generator
 * @param {String} opts - Further options you can pass
 * @param {String} item - Item which is scaffolded
 */
function runGenerator(generatorName, opts, item) {
	return new Promise((resolve, reject) => {
		Env.run(`${generatorName} ${opts}`, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve(item);
			}
		});
	});
}

/**
 * Get meta data for blueprint files which are generated to project.
 *
 * @param {String} name - name of blueprint
 * @param {String} type - type of blueprint (component, utility)
 */
function getBlueprintConfig({ name, type = 'component' }) {
	let scaffoldPath = helpers.getPath(name);
	const scaffoldSrcPath = Veams.DATA.projectConfig().paths.src || 'src';

	if (scaffoldPath.length > 1) {
		name = path.basename(name);
		scaffoldPath = path.join(scaffoldSrcPath, scaffoldPath);
	} else {
		scaffoldPath = Veams.DATA.projectConfig().paths[ type ] || scaffoldSrcPath;
	}

	return {
		name: name,
		path: `${scaffoldPath}`,
		type: type
	};
}

/**
 * Use inserter to integrate snippets into project.
 *
 * @param {String} path - path to component
 */
function insertBlueprint(path) {
	const insert = new Insert({
		templates: [ path ],
		endpoints: Veams.DATA.projectConfig().insertpoints
	});

	insert.render();
}

/**
 * Delete default files
 */
function deleteDefaultFiles(path) {
	helpers.remove(``)
}

/**
 * Check for updates
 */
function checkUpdateAvailability() {
	const message = [];
	const genNotifier = updateNotifier({ pkg: genPkg, updateCheckInterval: 1000 * 60 * 60 * 24 });
	const veamsNotifier = updateNotifier({ pkg: pkg, updateCheckInterval: 1000 * 60 * 60 * 24 });
	const inserterNotifier = updateNotifier({ pkg: inserterPkg, updateCheckInterval: 1000 * 60 * 60 * 24 });

	if (genNotifier.update || veamsNotifier.update || inserterNotifier.update) {
		message.push(chalk.gray('@veams/cli :: Update available for: \n\n'));

		if (genNotifier && genNotifier.update) {
			message.push(Veams.extensions.generatorId + chalk.gray(' (') + chalk.green.bold(genNotifier.update.latest) + chalk.gray(') - current: ' + genNotifier.update.current + '\n')
			);
		}

		if (veamsNotifier && veamsNotifier.update) {
			message.push(pkg.name + chalk.gray(' (') + chalk.green.bold(veamsNotifier.update.latest) + chalk.gray(') - current: ' + veamsNotifier.update.current + '\n')
			);
		}

		if (inserterNotifier && inserterNotifier.update) {
			message.push(inserterPkg.name + chalk.gray(' (') + chalk.green.bold(inserterNotifier.update.latest) + chalk.gray(') - current: ' + inserterNotifier.update.current + '\n')
			);
		}

		message.push(chalk.gray('   - Run ' + chalk.magenta('veams update') + ' to update.\n'));

		helpers.message('magenta', helpers.msg.info(message.join(' ')));
	}
}

function getVersions() {
	const message = [];

	message.push(genPkg.name + ': ' + genPkg.version);
	message.push(pkg.name + ': ' + pkg.version);
	message.push(inserterPkg.name + ': ' + inserterPkg.version);

	helpers.message('cyan', message.join('\n'));
}

function getImportFile(type) {
	return `${process.cwd()}/${Veams.DATA.projectConfig().entries[ type ]}`;
}

async function readImportFile(type) {
	try {
		return await helpers.readFile(getImportFile(type));
	} catch (err) {
		helpers.message('red', helpers.msg.error(err));
	}
}

/**
 * Get settings.json
 */
async function getComponentSettings(scaffoldPath, name) {
	const pathObj = await helpers.readFile(`${scaffoldPath}/${name}/${name}.settings.json`);
	const importStylePath = JSON.parse(pathObj).paths.styles;
	const importScriptPath = JSON.parse(pathObj).paths.scripts;

	return {
		importStylePath,
		importScriptPath
	}
}

/**
 * Update entry files
 */
async function updateImportFiles(importStylePath, importScriptPath) {
	try {
		if (importStylePath) {
			const styleFile = getImportFile('style');
			const styleContent = await helpers.readFile(styleFile);
			const stylePath = `${helpers.resolveImportPath(styleFile, importStylePath)}/${path.basename(importStylePath)}`;
			const updatedStyleFile = await styleParser(styleContent, stylePath);

			await helpers.writeFile(styleFile, updatedStyleFile);
		}

		if (importScriptPath) {
			const scriptFile = getImportFile('script');
			const scriptContent = await helpers.readFile(scriptFile);
			let scriptPath = path.normalize(`${helpers.resolveImportPath(scriptFile, importScriptPath)}/${path.basename(importScriptPath)}`);
			scriptPath = scriptPath.charAt(0) !== '.' ? `./${scriptPath}` : scriptPath;
			const updatedScriptFile = await scriptParser(scriptContent, {
				clName: helpers.capitalizeFirstLetter(helpers.toCamelCase(path.basename(scriptPath))),
				path: scriptPath
			});

			await helpers.writeFile(scriptFile, updatedScriptFile);
		}
	} catch(e) {
		return helpers.message('red', helpers.msg.error('updateImportFiles() could not executed: \n' + e));
	}

}

/* ==============================================
 * Export
 * ============================================== */
module.exports = {
	DATA: Veams.DATA,
	generators: Veams.generators,
	extensions: Veams.extensions,
	checkUpdateAvailability: checkUpdateAvailability,
	deleteDefaultFiles: deleteDefaultFiles,
	getBlueprintConfig: getBlueprintConfig,
	getComponentSettings: getComponentSettings,
	getImportFile: getImportFile,
	getVersions: getVersions,
	insertBlueprint: insertBlueprint,
	installPkg: installPkg,
	readImportFile: readImportFile,
	runGenerator: runGenerator,
	updateImportFiles: updateImportFiles
};