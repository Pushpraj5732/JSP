import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

const colorMap = {
    'navy-light': 'dark-muted',
    'navy-dark': 'dark',
    'navy': 'dark',
    'brand-red-dark': 'primary-dark',
    'brand-red-light': 'danger-subtle',
    'brand-red': 'primary',
    'brand-green-light': 'secondary-subtle',
    'brand-green-dark': 'secondary-dark',
    'brand-green': 'secondary',
    'brand-orange-light': 'accent-subtle',
    'brand-orange': 'accent',
    'brand-blue-light': 'primary-subtle',
    'brand-blue': 'primary',
    'orange-200': 'accent/20',
};

// Also handle the specific hex/rgba survivors
const rawReplacements = {
    'bg-\\[rgba\\(26,43,72,0\\.6\\)\\]': 'bg-dark/60',
    'bg-\\[rgba\\(26,43,72,0\\.8\\)\\]': 'bg-dark/80',
    'bg-\\[\\#1C1C1E\\]': 'bg-slate-50',
    'bg-\\[\\#2C2C2E\\]': 'bg-white',
    'bg-\\[\\#3A3A3C\\]': 'bg-slate-100',
    'bg-\\[\\#F8F9FA\\]': 'bg-surface-alt',
};

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // 1. Replace Tailwind color tokens (including variants like focus:border-navy)
            // We look for patterns like bg-navy, text-navy, border-navy, focus:ring-navy, etc.
            for (const [oldColor, newColor] of Object.entries(colorMap)) {
                // This regex looks for (prefix)-(oldColor) where prefix is bg, text, border, ring, etc.
                // It handles variants becausevariants are separated by : which is not \w or -
                const regex = new RegExp(`(bg|text|border|ring|from|to|via)-${oldColor.replace(/-/g, '\\-')}(?![\\w-])`, 'g');
                if (regex.test(content)) {
                    content = content.replace(regex, `$1-${newColor}`);
                    modified = true;
                }
            }

            // 2. Replace raw strings/hex
            for (const [oldRaw, newRaw] of Object.entries(rawReplacements)) {
                const regex = new RegExp(oldRaw, 'g');
                if (regex.test(content)) {
                    content = content.replace(regex, newRaw);
                    modified = true;
                }
            }

            // 3. Specific cleanup for group-hover:text-navy etc if they don't follow the pattern exactly
            const manual = {
                'group-hover:text-navy': 'group-hover:text-primary',
                'group-hover:bg-brand-red': 'group-hover:bg-primary',
                'hover:text-white': 'hover:text-dark', // Fix for the light theme hover contrast
            };
            for (const [oldM, newM] of Object.entries(manual)) {
                if (content.includes(oldM)) {
                    content = content.split(oldM).join(newM);
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

console.log('Starting refined color replacements...');
processDirectory(srcDir);
console.log('Replacement complete.');
