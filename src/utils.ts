import * as vscode from 'vscode';

interface Option
{
    description: string;
    command: any;
}


export function getTerminal()
{
	let terminal = vscode.window.activeTerminal;

	if(typeof terminal === "undefined")
	{
		terminal = vscode.window.createTerminal();
	}

	return terminal;
}

export async function getUserInputFromOptions(placeHolder : string, options : Option[])
{
    const quickpicks: string[] = [];
    options.map(opt => quickpicks.push(opt.description));
    const description = await vscode.window.showQuickPick(quickpicks, {
        placeHolder
    });
    const i = options.findIndex(opt => opt.description === description);

    return options[i].command;
}