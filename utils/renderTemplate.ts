import * as fs from 'node:fs';
import * as path from 'node:path';

import deepMerge from './deepMerge';
import sortDependencies from './sortDependencies';

/**
 * Renders a template folder/file to the file system,
 * by recursively copying all files under the `src` directory,
 * with the following exception:
 *   - `_filename` should be renamed to `.filename`
 *   - Fields in `package.json` should be recursively merged
 * @param {string} src source filename to copy
 * @param {string} dest destination filename of the copy operation
 * @param {object} options data for ejs parse
 */
function renderTemplate(src, dest, options = {}) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    // skip node_module
    if (path.basename(src) === 'node_modules') {
      return;
    }

    // if it's a directory, render its subdirectories and files recusively
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      renderTemplate(path.resolve(src, file), path.resolve(dest, file), options);
    }
    return;
  }

  const filename = path.basename(src);

  if (filename === 'package.json' && fs.existsSync(dest)) {
    // merge instead of overwriting
    const existing = JSON.parse(fs.readFileSync(dest, 'utf8'));
    const newPackage = JSON.parse(fs.readFileSync(src, 'utf8'));
    const pkg = sortDependencies(deepMerge(existing, newPackage));
    fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + '\n');
    return;
  }

  if (filename.startsWith('_')) {
    // rename `_file` to `.file`
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'));
  }

  fs.copyFileSync(src, dest);
}

export default renderTemplate;
