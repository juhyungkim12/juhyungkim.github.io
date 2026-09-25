import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';
import {normalizeProfile,normalizeContact,normalizeCV,normalizeEntries,normalizePublications,normalizeResearch,normalizeSkills} from '../src/lib/normalize.ts';
for(const empty of [undefined,null,'',{}]){
 assert.deepEqual(normalizeProfile(empty).interests,[]);
 assert.equal(normalizeProfile(empty).portrait,'');
 assert.equal(normalizeContact(empty).email,'');
 assert.equal(normalizeCV(empty).file,'');
 for(const normalize of [normalizePublications,normalizeResearch,normalizeSkills])assert.deepEqual(normalize(empty),[]);
 assert.deepEqual(normalizeEntries(empty).entries,[]);
}
assert.deepEqual(normalizeProfile({interests:[null,'','Robotics'],introduction:'User text'}).interests,['Robotics']);
assert.equal(normalizeProfile({introduction:'User text'}).introduction,'User text');
const partial=normalizePublications({entries:[null,{}, {title:'Draft',authors:null,year:'',id:''}, {id:'publication-1',title:'Existing',year:2026}]});
assert.equal(partial.length,2);assert.equal(partial[0].title,'Existing');assert.equal(partial[1].authors,'');assert.equal(partial[1].type,'Other publications');assert.equal(new Set(partial.map(p=>p.id)).size,2);
assert.deepEqual(normalizeResearch({entries:[{title:'Draft',media:[null,{}, {image:''}],related:null} ]})[0].media,[]);
assert.equal(normalizeSkills({entries:[{name:'Draft',category:null} ]})[0].category,'Other skills');
console.log('PASS: optional-field normalization, partial entries, sort order, fallback IDs.');
// Integration tests always modify isolated copies, never the actual CMS data.
const hashSource=()=>JSON.stringify(fs.readdirSync('src/data').sort().map(name=>[name,fs.readFileSync('src/data/'+name,'utf8')]));
const before=hashSource();
fs.mkdirSync('.tools',{recursive:true});
const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'juhyung-cms-regression-'));
for(const folder of ['src','public','scripts'])fs.cpSync(folder,path.join(fixture,folder),{recursive:true});
for(const file of ['astro.config.mjs','tsconfig.json','package.json','.pages.yml'])fs.copyFileSync(file,path.join(fixture,file));
fs.symlinkSync(path.resolve('node_modules'),path.join(fixture,'node_modules'),'junction');
const put=(name,data)=>fs.writeFileSync(path.join(fixture,'src/data',name+'.json'),JSON.stringify(data));
const astro=path.resolve('node_modules/astro/bin/astro.mjs');
function run(args){const result=spawnSync(process.execPath,args,{cwd:fixture,encoding:'utf8'});if(result.status!==0){console.error(result.stdout,result.stderr);throw Error('Fixture failed: '+args.join(' '));}}
for(const name of fs.readdirSync('src/data'))put(name.replace('.json',''),{});
run([astro,'check']);run([astro,'build']);run(['scripts/validate.mjs']);
console.log('PASS: every content file empty; Astro check, production build and validate.');
put('profile',{name:'Fixture name',interests:null,portrait:null,poster:'',video:null});
put('education',{entries:[null,'',{}, {title:'Fixture education',date:null}]});
put('awards',{entries:null});put('contact',{email:null,scholar:''});put('cv',{file:null});
put('publications',{entries:[null,{}, {title:'Fixture publication',authors:null,year:'',order:null,featured:true,image:null,pdf:'',doi:null,type:'',status:null}]});
put('research',{entries:[null,{}, {title:'Fixture research',media:[null,{}, {image:'',video:null}],related:[null,'missing-draft'],order:''}]});
put('skills',{entries:[null,{}, {name:'Fixture skill',category:null,media:null}]});
run([astro,'check']);run([astro,'build']);run(['scripts/validate.mjs']);
const html=fs.readFileSync(path.join(fixture,'dist/publications/index.html'),'utf8');assert(html.includes('Fixture publication'));assert(html.includes('Other publications'));assert(!html.includes('href="undefined"'));
assert.equal(hashSource(),before,'Actual CMS content changed');
console.log('PASS: null/blank optional values and partially completed entries; Astro check, build and validate; actual content unchanged.');
