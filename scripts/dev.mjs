import { spawn } from 'node:child_process';
import process from 'node:process';

const nodePath = 'C:\\Program Files\\nodejs\\node.exe';
const ngPath = `${process.cwd()}\\node_modules\\@angular\\cli\\bin\\ng.js`;
const args = ['serve', '--host', '127.0.0.1', '--port', process.env.PORT || '4200', '--open', '--hmr', '--live-reload'];

const child = spawn(nodePath, [ngPath, ...args], {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: { ...process.env, BROWSER: 'default' }
});

child.on('exit', (code) => process.exit(code ?? 0));
