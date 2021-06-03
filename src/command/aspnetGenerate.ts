import * as vscode from 'vscode';
import { getTerminal, getUserInputFromOptions } from '../utils';
import * as path from 'path';
import * as fs from 'fs';

let currentContext : vscode.ExtensionContext;

export async function aspnetGenerate(context : vscode.ExtensionContext) {
    const terminal = getTerminal();
    currentContext = context;

    const generators = [
        {description: "Area", command: area},
        {description: "Controller", command: controller},
        {description: "Identity", command: identity},
        {description: "Razor Page", command: razorpage},
        {description: "View", command: view},
    ];

    const generator = await getUserInputFromOptions('Select generator', generators);

    await generator();

}

async function area()
{

}

async function controller()
{
    const terminal = getTerminal();

    const model = await vscode.window.showInputBox({
        value: 'Model (fullnamespace.modelname)',
    });

    const dbcontext = await vscode.window.showInputBox({
        value: 'Dbcontext (fullnamespace.dbcontextName)',
    });

    const usingDbContext = typeof dbcontext === "undefined" ?false:true;

    const useDefaultLayout = await vscode.window.showQuickPick(["Yes", "No"],
    {title: "Use default layout"});

    terminal.sendText(`dotnet aspnet-codegenerator` +
    `controller -name UserController ` +
    `-m ${model}` +
    `${usingDbContext?`-dc ${dbcontext}`:''} ` +
    //`--relativeFolderPath Controllers ` +
    `${useDefaultLayout==="Yes" ? '--useDefaultLayout':''}` +
    `--referenceScriptLibraries`
    );
}

async function identity()
{
    const dbcontext = await vscode.window.showInputBox({
        value: 'Dbcontext (fullnamespace.dbcontextName)',
    });


    const panel = vscode.window.createWebviewPanel(
        'genIdentity',
        'Indentity Generator Options',
        vscode.ViewColumn.One,
        {
          enableScripts: true
        }
      );

    panel.webview.onDidReceiveMessage(
        (message : Object) => {
            const files = Object.keys(message);
            let strfiles = "";
            files.map(file => strfiles += file + ";" );

            vscode.window.showErrorMessage(strfiles);

            const terminal = getTerminal();

            terminal.sendText(`dotnet aspnet-codegenerator identity -dc ${dbcontext} --files "${strfiles}"`);

        },
        undefined,
        currentContext.subscriptions
        );

    const filePath: vscode.Uri = vscode.Uri.file(path.join(currentContext.extensionPath, 
        'src', 'webviews','identity' ,'identity.html'));
    panel.webview.html = fs.readFileSync(filePath.fsPath, 'utf8');
    


}

async function razorpage()
{

}

async function view()
{

}