const fs = require('fs');
let c = fs.readFileSync('src/i18n/messages.ts', 'utf-8');

c = c.replace(/missingQuestion: '（設問なし）',\n\s*agree: '同意',\n\s*disagree: '不同意',/g, 
  "missingQuestion: '（設問なし）',\n        agree: '同意する',\n        disagree: '反対する',");

fs.writeFileSync('src/i18n/messages.ts', c);
console.log('Fixed JA agree/disagree');
