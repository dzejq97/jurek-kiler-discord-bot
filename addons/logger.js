const chalk = require('chalk');

module.exports = class {
	logInfo(str) {
		console.log(str);
	}

	logSuccess(str) {
		console.log(chalk.green(str));
	}

	logWarning(str) {
		console.log(chalk.yellow(str));
	}

	logError(str) {
		console.log(chalk.red(str));
	}
}