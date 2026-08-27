const fs = require('fs');
const path = require('path');

const targetFiles = [
  'src/pages/PlacementPage.tsx',
  'src/pages/NaacPage.tsx',
  'src/pages/DepartmentListPage.tsx',
  'src/pages/DepartmentDetailPage.tsx',
  'src/pages/NotificationsPage.tsx',
  'src/pages/CampusPage.tsx',
  'src/pages/ContactPage.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/AdminPortalPage.tsx'
];

const basePath = 'c:/Users/Rahul R/Downloads/vinn-main/vinn-main';

for (const relPath of targetFiles) {
  const fullPath = path.join(basePath, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log('Not found:', fullPath);
    continue;
  }
  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace colors
  // Replace text colors
  content = content.replace(/text-\[#C81E51\]/g, 'text-[#0A2540]');
  content = content.replace(/text-\[#A0163E\]/g, 'text-[#0A2540]');
  content = content.replace(/border-\[#C81E51\]/g, 'border-[#0A2540]');
  content = content.replace(/border-\[#A0163E\]/g, 'border-[#0A2540]');
  content = content.replace(/bg-\[#C81E51\]/g, 'bg-[#0A2540]');
  content = content.replace(/bg-\[#A0163E\]/g, 'bg-[#061727]');
  content = content.replace(/hover:bg-\[#C81E51\]/g, 'hover:bg-[#1E40AF]');
  content = content.replace(/hover:text-\[#C81E51\]/g, 'hover:text-[#FF6B00]');
  content = content.replace(/hover:border-\[#C81E51\]/g, 'hover:border-[#FF6B00]');
  content = content.replace(/selection:bg-\[#C81E51\]/g, 'selection:bg-[#FF6B00]');
  content = content.replace(/focus:border-\[#C81E51\]/g, 'focus:border-[#FF6B00]');
  content = content.replace(/focus:ring-\[#C81E51\]/g, 'focus:ring-[#FF6B00]');
  content = content.replace(/#C81E51/g, '#0A2540');
  content = content.replace(/#A0163E/g, '#061727');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Updated:', relPath);
}
