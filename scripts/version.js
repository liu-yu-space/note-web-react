// scripts/generate-version.js
import fs from 'fs';
import { execSync } from 'child_process';

const timestamp = new Date().toISOString();
const commitHash = execSync('git rev-parse --short HEAD').toString().trim();

const content = `Version: ${commitHash}\nDeployed: ${timestamp}\n`;

fs.writeFileSync('public/version.txt', content);
console.log('✅ Version file generated:');
console.log(content);
