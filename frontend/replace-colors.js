const fs = require('fs');
const path = require('path');

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
    'bg-[rgba(26,43,72,0.6)]': 'bg-dark/60',
    'bg-[rgba(26,43,72,0.8)]': 'bg-dark/80',
    'bg-[#1C1C1E]': 'bg-slate-50',
    'bg-[#2C2C2E]': 'bg-white',
    // Text
    'text-navy': 'text-dark',
    'text-brand-red': 'text-primary',
    'text-brand-green': 'text-secondary',
    'text-[#F2C94C]': 'text-accent',
    'text-slate-400': 'text-slate-500',
    'text-slate-300': 'text-slate-600',
    'text-white': 'text-white', // unchanged basically but good for tracking
    // Borders
    'border-brand-red': 'border-primary',
    'border-brand-green': 'border-secondary',
    'border-slate-800': 'border-slate-200',
    'border-slate-700/50': 'border-slate-100',
    'border-[#3A3A3C]': 'border-slate-200',
    // Hovers
    'hover:bg-slate-800': 'hover:bg-slate-100',
    'hover:border-[#F2C94C]/30': 'hover:border-accent/30',
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

            for (const [oldClass, newClass] of Object.entries(replacements)) {
                // Ensure we replace full words by using regex with word boundaries where applicable
                // Since tailwind classes have hyphens, standard \b might fail, so we use a crafted regex
                // Negative lookahead/behind to prevent matching 'bg-navy' inside 'bg-navy-light'
                const regex = new RegExp(`(?<![\\w-]|:)${oldClass.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}(?![\\w-])`, 'g');
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
