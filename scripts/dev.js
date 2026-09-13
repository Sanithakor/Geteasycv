const { spawn } = require('child_process');

const args = process.argv.slice(2);
let port = '3000';
let hostname = '0.0.0.0';

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--port' || arg === '-p') {
    if (args[i + 1] && !args[i + 1].startsWith('-')) {
      port = args[++i];
    }
  } else if (arg.startsWith('--port=')) {
    port = arg.split('=')[1];
  } else if (arg === '--host' || arg === '--hostname' || arg === '-H') {
    if (args[i + 1] && !args[i + 1].startsWith('-')) {
      hostname = args[++i];
    }
  } else if (arg.startsWith('--host=')) {
    hostname = arg.split('=')[1];
  } else if (arg.startsWith('--hostname=')) {
    hostname = arg.split('=')[1];
  }
}

const nextBin = require.resolve('next/dist/bin/next');
const child = spawn(process.execPath, [nextBin, 'dev', '-p', port, '-H', hostname], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});

['SIGINT', 'SIGTERM'].forEach((sig) => {
  process.on(sig, () => {
    if (child && !child.killed) {
      child.kill(sig);
    }
  });
});
