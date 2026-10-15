import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
function revisar(dir) { for (const f of readdirSync(dir, {withFileTypes:true})) { const p=join(dir,f.name); if(f.isDirectory()) revisar(p); else if(/\.(m?js)$/.test(p)) execFileSync(process.execPath,['--check',p],{stdio:'inherit'}); } }
revisar('public/assets/js'); revisar('scripts'); revisar('tests');
const data=JSON.parse(readFileSync('public/data/servicios.json','utf8'));
if(!Array.isArray(data) || data.length !== 5) throw Error('Se esperan cinco servicios heredados.');
console.log('Sintaxis JS y JSON correctos. Este check no certifica los retos EA2.');
