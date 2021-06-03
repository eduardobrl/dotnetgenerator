import * as vscode from 'vscode';
import { getTerminal, getUserInputFromOptions } from '../utils';
export default async function generate() {

    const terminal = getTerminal();
    
    const options = [
        {description : "Console Application", command: "console"},
        {description : "Class library", command: "classlib"},
        {description : "WPF Application", command: "wpf"},
        {description : "WPF Class library", command: "wpflib"},
        {description : "WPF Custom Control Library", command: "wpfcustomcontrollib"},
        {description : "WPF User Control Library", command: "wpfusercontrollib"},
        {description : "Windows Forms (WinForms) Application", command: "winforms"},
        {description : "Windows Forms (WinForms) Class library", command: "winformslib"},
        {description : "Unit Test Project", command: "mstest"},
        {description : "NUnit 3 Test Project", command: "nunit"},
        {description : "NUnit 3 Test Item", command: "nunit-test"},
        {description : "Razor Component", command: "viewimports"},
        {description : "Razor Page", command: "viewstart"},
        {description : "MVC ViewImports", command: "viewstart"},
        {description : "MVC ViewStart", command: "blazorserver"},
        {description : "Blazor WebAssembly App", command: "blazorwasm"},
        {description : "ASP.NET Core Empty", command: "web"},
        {description : "ASP.NET Core Web App (Model-View-Controller)", command: "mvc"},
        {description : "ASP.NET Core Web App", command: "razor"},
        {description : "ASP.NET Core with Angular", command: "angular"},
        {description : "ASP.NET Core with React.js", command: "react"},
        {description : "ASP.NET Core with React.js and Redux", command: "reactredux"},
        {description : "Razor Class Library", command: "razorclasslib"},
        {description : "ASP.NET Core Web API", command: "webapi"},
        {description : "ASP.NET Core gRPC Service", command: "grpc"},
        {description : "dotnet gitignore file", command: "gitignore"},
        {description : "global.json file", command: "globaljson"},
        {description : "NuGet Config", command: "nugetconfig"},
        {description : "Dotnet local tool manifest file", command: "tool-manifest"},
        {description : "Web Config", command: "webconfig"},
        {description : "Solution File", command: "sln"},

    ];
    
    const template = await getUserInputFromOptions('Select project template', options);

    const authentication = await vscode.window.showQuickPick(
        ['None', 'Individual', 'IndividualB2C', 'SingleOrg', 'MultiOrg', 'Windows'], {
        placeHolder: 'Autentication',
        onDidSelectItem: item => vscode.window.showInformationMessage(`${item}`)
    });

    terminal.sendText(`dotnet new ${template} -au ${authentication}`);

};

