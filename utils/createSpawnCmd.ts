import { spawn } from 'child_process';

function createSpawnCmd(dest, stdio = 'inherit') {
  return function (cmd, args = []) {
    const ls = spawn(cmd, args, {
      cwd: dest,
      stdio,
      shell: true
    });
    return new Promise((resolve, reject) => {
      ls.on('close', (code) => {
        code === 0 ? resolve(true) : reject(false);
      });
    });
  };
}

export default createSpawnCmd;
