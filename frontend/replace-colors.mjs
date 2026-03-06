import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

const replacements = {
    // Backgrounds
    'bg-navy-light': 'bg-dark-muted',
    'bg-navy': 'bg-dark',
    'bg-brand-red-light': 'bg-danger-subtle',
    'bg-brand-red-dark': 'bg-primary-dark',
    'bg-brand-red': 'bg-primary',
    'bg-brand-green-light': 'bg-secondary-subtle',
    'bg-brand-green': 'bg-secondary',
    'bg-\\[rgba\\(26,43,72,0\\.6\\)\\]': 'bg-dark/60',
    'bg-\\[rgba\\(26,43,72,0\\.8\\)\\]': 'bg-dark/80',
    'bg-\\[\\#1C1C1E\\]': 'bg-slate-50',
    'bg-\\[\\#2C2C2E\\]': 'bg-white',
    'bg-\\[\\#3A3A3C\\]': 'bg-slate-100', // Slider avatar bg
    // Text
    'text-navy-light': 'text-dark-muted',
    'text-navy': 'text-dark',
    'text-brand-red': 'text-primary',
    'text-brand-green': 'text-secondary',
    'text-\\[\\#F2C94C\\]': 'text-accent',
    'text-slate-400': 'text-slate-500',
    'text-slate-300': 'text-slate-600',
    // Borders
    'border-brand-red': 'border-primary',
    'border-brand-green': 'border-secondary',
    'border-navy': 'border-dark',
    'border-slate-800': 'border-slate-200',
    'border-slate-700\\/50': 'border-slate-100',
    'border-\\[\\#3A3A3C\\]': 'border-slate-200',
    // Hovers
    'hover:bg-slate-800': 'hover:bg-slate-100',
    'hover:border-\\[\\#F2C94C\\]\\/30': 'hover:border-accent/30',
    'hover:bg-navy-light': 'hover:bg-dark-muted',
    'hover:bg-navy': 'hover:bg-dark',
    'group-hover:text-brand-red': 'group-hover:text-primary',
    'hover:text-white': 'hover:text-dark'
};

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            for (const [oldClassEscaped, newClass] of Object.entries(replacements)) {
                // Negative lookahead/behind to prevent partial matches
                const regex = new RegExp(`(?<![\\w-]|:)${oldClassEscaped}(?![\\w-])`, 'g');
                if (regex.test(content)) {
                    content = content.replace(regex, newClass);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

console.log('Starting color variable replacements...');
processDirectory(srcDir);
console.log('Replacement complete.');
