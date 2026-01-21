const { spawn } = require('node:child_process');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const nestEntry = path.join(projectRoot, 'dist', 'main.js');

const child = spawn(process.execPath, [nestEntry], {
	cwd: projectRoot,
	env: {
		...process.env,
		NODE_ENV: 'production',
		PORT: '3001',
	},
	stdio: 'inherit',
});

child.on('exit', (code, signal) => {
	console.log('nest exited:', { code, signal });
});

child.on('error', err => {
	console.error('failed to start nest:', err);
});

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
