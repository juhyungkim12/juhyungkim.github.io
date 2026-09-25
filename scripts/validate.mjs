import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import YAML from 'yaml';
const config=YAML.parse(fs.readFileSync('.pages.yml','utf8'));
let checked=0;
function validate(value,fields,location){
 if(value==null||value==='')return;
 assert(typeof value==='object'&&!Array.isArray(value),location+': expected object');
 for(const key of Object.keys(value)) assert(fields.some(f=>f.name===key),`${location}.${key} is not editable in CMS`);
 for(const f of fields){const val=value[f.name];if(val==null||(typeof val==='string'&&!val.trim()))continue;
  if(f.list){assert(Array.isArray(val),`${location}.${f.name} must be an array`);for(const item of val){if(f.type==='object')validate(item,f.fields,location+'.'+f.name);else assert(item==null||typeof item==='string');}}
  else if(f.type==='number')assert(typeof val==='number');
  else if(f.type==='boolean')assert(typeof val==='boolean');
  else if(f.type==='select')assert((val===''&&!f.required)||f.options.values.includes(val),`${location}.${f.name}: invalid option`);
  else assert(typeof val==='string',`${location}.${f.name}: expected string`);
  if(['image','file'].includes(f.type)&&val){assert(!val.startsWith('javascript:'));if(val.startsWith('/'))assert(fs.existsSync('public'+val),'Missing media: '+val);}
 }
 checked++;
}
for(const entry of config.content){assert(fs.existsSync(entry.path));validate(JSON.parse(fs.readFileSync(entry.path,'utf8')),entry.fields,entry.name);}
const read=n=>{const data=JSON.parse(fs.readFileSync(`src/data/${n}.json`,'utf8'));return Array.isArray(data?.entries)?data.entries.filter(item=>item&&typeof item==='object'&&!Array.isArray(item)):[];};
for(const name of ['research','publications']){const ids=read(name).map(x=>x.id).filter(id=>typeof id==='string'&&id.trim());assert(ids.every(id=>/^[a-z0-9-]+$/.test(id)),`${name}: unique lowercase IDs required`);assert(new Set(ids).size===ids.length,`${name}: duplicate IDs`);}
const publications=read('publications');for(const p of publications){if(typeof p.doi==='string'&&p.doi.trim())assert(/^(10\.\d{4,9}\/\S+|https:\/\/doi\.org\/\S+)$/.test(p.doi),'Invalid DOI');}
for(const project of read('research'))for(const id of Array.isArray(project.related)?project.related:[])if(id&&!publications.some(p=>p.id===id&&p.title?.trim()))console.warn('Unresolved draft publication reference (not displayed): '+id);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const htmlFiles=walk('dist').filter(p=>p.endsWith('.html'));
for(const file of htmlFiles){const html=fs.readFileSync(file,'utf8');for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){const url=decodeURI(match[1]);const target=path.join('dist',url);assert(fs.existsSync(target)||fs.existsSync(path.join(target,'index.html')),`${file}: broken link ${url}`);}assert(html.includes('<main id="main">'));}
for(const route of ['index.html','research/index.html','publications/index.html','skills/index.html','contact/index.html'])assert(fs.existsSync('dist/'+route));
console.log(`Validated ${checked} CMS objects and ${htmlFiles.length} HTML pages; local links and media resolve.`);

