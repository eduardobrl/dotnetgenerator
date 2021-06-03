// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function getTerminal()
{
	let terminal = vscode.window.activeTerminal;

	if(typeof terminal === "undefined")
	{
		terminal = vscode.window.createTerminal();
	}

	return terminal;
}





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

		vscode.commands.registerCommand('dotnetgenerator.generate', async () => {

		const terminal = getTerminal();
		
		const options = [
			{template : "Console Application", shortname: "console"},
			{template : "Class library", shortname: "classlib"},
			{template : "WPF Application", shortname: "wpf"},
			{template : "WPF Class library", shortname: "wpflib"},
			{template : "WPF Custom Control Library", shortname: "wpfcustomcontrollib"},
			{template : "WPF User Control Library", shortname: "wpfusercontrollib"},
			{template : "Windows Forms (WinForms) Application", shortname: "winforms"},
			{template : "Windows Forms (WinForms) Class library", shortname: "winformslib"},
			{template : "Unit Test Project", shortname: "mstest"},
			{template : "NUnit 3 Test Project", shortname: "nunit"},
			{template : "NUnit 3 Test Item", shortname: "nunit-test"},
			{template : "Razor Component", shortname: "viewimports"},
			{template : "Razor Page", shortname: "viewstart"},
			{template : "MVC ViewImports", shortname: "viewstart"},
			{template : "MVC ViewStart", shortname: "blazorserver"},
			{template : "Blazor WebAssembly App", shortname: "blazorwasm"},
			{template : "ASP.NET Core Empty", shortname: "web"},
			{template : "ASP.NET Core Web App (Model-View-Controller)", shortname: "mvc"},
			{template : "ASP.NET Core Web App", shortname: "razor"},
			{template : "ASP.NET Core with Angular", shortname: "angular"},
			{template : "ASP.NET Core with React.js", shortname: "react"},
			{template : "ASP.NET Core with React.js and Redux", shortname: "reactredux"},
			{template : "Razor Class Library", shortname: "razorclasslib"},
			{template : "ASP.NET Core Web API", shortname: "webapi"},
			{template : "ASP.NET Core gRPC Service", shortname: "grpc"},
			{template : "dotnet gitignore file", shortname: "gitignore"},
			{template : "global.json file", shortname: "globaljson"},
			{template : "NuGet Config", shortname: "nugetconfig"},
			{template : "Dotnet local tool manifest file", shortname: "tool-manifest"},
			{template : "Web Config", shortname: "webconfig"},
			{template : "Solution File", shortname: "sln"},

		];
		const quickpicks: string[] = [];
		options.map(opt => quickpicks.push(opt.template));

		const template = await vscode.window.showQuickPick(quickpicks, {
			placeHolder: 'Select project template',
			onDidSelectItem: item => vscode.window.showInformationMessage(`${item}`)
		});

		const authentication = await vscode.window.showQuickPick(
			['None', 'Individual', 'IndividualB2C', 'SingleOrg', 'MultiOrg', 'Windows'], {
			placeHolder: 'Autentication',
			onDidSelectItem: item => vscode.window.showInformationMessage(`${item}`)
		});

		const i = options.findIndex(opt => opt.template === template);
		terminal.sendText(`dotnet new ${options[i].shortname} -au ${authentication}`);


	}),

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
