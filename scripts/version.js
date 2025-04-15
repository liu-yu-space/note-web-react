import fs from 'fs';
import { execSync } from 'child_process';

const timestamp = new Date().toISOString();
const commitTag = execSync('git describe --tags --abbrev=0').toString().trim();

const content = `Version: ${commitTag}\nDeployed: ${timestamp}\n`;

fs.writeFileSync('public/version.txt', content);
console.log('✅ Version file generated:');
console.log(content);
