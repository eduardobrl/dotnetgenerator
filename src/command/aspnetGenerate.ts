import * as vscode from 'vscode';
import { getTerminal, getUserInputFromOptions } from '../utils';


export async function aspnetGenerate() {
    const terminal = getTerminal();

    const migration = await vscode.window.showInputBox({
        value: 'Model Name',
    });

    const generators = [
        {description: "Area", command: area},
        {description: "Controller", command: controller},
        {description: "Identity", command: identity},
        {description: "Razor Page", command: razorpage},
        {description: "View", command: view},
    ];

    const generator = await getUserInputFromOptions('Select generator', generators);

    generator();

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

}

async function razorpage()
{

}

async function view()
{

}