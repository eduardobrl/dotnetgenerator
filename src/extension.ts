// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import generate from './command/generate';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dotnetgenerator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let commands = [

		vscode.commands.registerCommand('dotnetgenerator.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from dotnetGenerator!');
	}),

		vscode.commands.registerCommand('dotnetgenerator.generate', generate),

	vscode.commands.registerCommand('dotnetgenerator.migrationCreate', async () => {

		const terminal = getTerminal();

		const migration = await vscode.window.showInputBox({
			value: 'Migration Name',
		});

		terminal.sendText(`dotnet ef migration add ${migration}`);

	}),

	vscode.commands.registerCommand('dotnetgenerator.migrationRun', async () => {

		const terminal = getTerminal();

		terminal.sendText(`dotnet ef database update`);

	}),

	vscode.commands.registerCommand('dotnetgenerator.crud', async () => {

		const terminal = getTerminal();

		const migration = await vscode.window.showInputBox({
			value: 'Model Name',
		});

		terminal.sendText(`dotnet aspnet-codegenerator` +
		 `controller -name UserController ` +
		 `-m mvc.Models.User` +
		 `-dc mvc.Models.ApplicationDbContext` +
		 `--relativeFolderPath Controllers ` +
		 `--useDefaultLayout --referenceScriptLibraries`);

	}),
];



	context.subscriptions.push(...commands);
}

// this method is called when your extension is deactivated
export function deactivate() {}
