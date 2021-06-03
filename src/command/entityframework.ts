import * as vscode from 'vscode';
import { getTerminal, getUserInputFromOptions } from '../utils';

export async function migrationsCreate()
{
    const terminal = getTerminal();

    const migration = await vscode.window.showInputBox({
        value: 'Migration Name',
    });

    terminal.sendText(`dotnet ef migration add ${migration}`);
}

export async function migrationsRun()
{
    const terminal = getTerminal();

    terminal.sendText(`dotnet ef database update`);
}