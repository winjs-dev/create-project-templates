#!/usr/bin/env zx
import 'zx/globals';

const { version } = JSON.parse(await fs.readFile('./package.json'));
const playgroundDir = path.resolve(__dirname, '../playground/');

await fs.remove(playgroundDir);

await $`pnpm build`;
await $`pnpm snapshot`;

cd(playgroundDir);

await $`git init`;
await $`git add -A .`;
try {
  await $`git commit -m "version ${version} snapshot"`;
} catch (e) {
  if (!e.stdout.includes('nothing to commit')) {
    throw e;
  }
}

await $`git tag -m "v${version}" v${version}`;
await $`git remote add origin https://github.com/cloud-templates/create-project-templates.git`;
// 若执行 push 的时候，github 有报错，说明 token 已过期，则需要进行以下操作（mac mini 没问题）：
// 1. 进入 https://github.com/settings/tokens
// From your GitHub account, go to Settings → Developer Settings → Personal Access Token → Generate New Token (Give your password) → Fillup the form → click Generate token → Copy the generated Token, it will be something like ghp_sFhFsSHhTzMDreGRLjmks4Tzuzgthdvfsrta
// 2. 终端会让输入用户名和密码，用户名为：cklwblove，密码就是第1步骤的 token
await $`git push -f https://github.com/cloud-templates/create-project-templates.git main`;
await $`git push --force --tags`;

const projectRoot = path.resolve(__dirname, '../');
cd(projectRoot);
