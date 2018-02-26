/**
 * Execute individual tasks
 */
const path = require('path');
const exec = require('child-process-promise').exec;
const cwd = path.resolve(__dirname, `../../`);

module.exports = (args) => {
	const task = args[0];
	const option = args[1];

	switch (task) {
		case `grunticon`:


			// exec(`npm run `);

			break;
		default:
			break;
	}
};