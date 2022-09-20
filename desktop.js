#!/usr/bin/env node

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';
import { convert, warnings } from './SMASM.js';
import './stdlib.js';

// Define version
const VERSION = JSON.parse(fs.readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'package.json'), 'utf-8')).version;

// Check arguments
if (process.argv.length < 3) {
  console.error(`Error: Not enough arguments provided
If you're not sure what to do, try 'smasm --help'`);
  process.exit(1);
}

// Command logic
if (process.argv[2] === '-h' || process.argv[2] === '--help') {
  console.log(`Usage:
  smasm [option]
  smasm [file] [-f, --file?]

Options:
  -f, --file     Writes output to a file in addition to clipboard
  -h, --help     Displays this help page
  -v, --version  Displays version info`);
} else if (process.argv[2] === '-v' || process.argv[2] === '--version') {
  console.log(`Simplified Mindustry Assembly  v${VERSION}`);
} else {
  fs.promises.readFile(process.argv[2], 'utf-8').then(data => {
    const res = convert(data);
    if (!res[0]) {
      console.error(`Error on line ${res[1].line}: ${res[1].message}`);
      process.exit(1);
    }
    warnings.forEach(warning => {
      console.log(`Warning on line ${warning.line}: ${warning.message}`);
    });
    return res[1];
  }).then(result => {
    spawn('clip').stdin.end(result);
    console.log('Copied to clipboard');
    if (process.argv[3] === '-f' || process.argv[3] === '--file')
      fs.promises.writeFile('out.masm', result).catch(() => {
        console.error("Error: There was a problem writing to the file 'out.masm'");
        process.exit(1);
      });
  }).catch((err) => {
    console.error(`Error: There was a problem reading/converting the file '${process.argv[2]}'\n`);
    console.error(err);
    process.exit(1);
  });
}
