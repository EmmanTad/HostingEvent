// copies the website files into www/ for Capacitor
const fs=require('fs');fs.rmSync('www',{recursive:true,force:true});fs.mkdirSync('www');
for(const f of fs.readdirSync('.'))if(/\.(html|css|js|webmanifest)$/.test(f)&&!['prep.js','sw.js'].includes(f))fs.copyFileSync(f,'www/'+f);
fs.cpSync('images','www/images',{recursive:true});fs.cpSync('icons','www/icons',{recursive:true});console.log('www ready');
