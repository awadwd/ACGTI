const fs = require('fs');
let c = fs.readFileSync('src/i18n/messages.ts', 'utf-8');

c = c.replace(/scale: \['とても同意', '同意', 'やや同意', '中立', 'やや不同意', '不同意', 'とても不同意'\],/g, 
  "scale: ['強く同意する', '同意する', 'やや同意する', '中立', 'やや反対する', '反対する', '強く反対する'],");

fs.writeFileSync('src/i18n/messages.ts', c);
console.log('Fixed JA scale arrays');
