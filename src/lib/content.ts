import profile from '../data/profile.json';
import about from '../data/about.json';
import education from '../data/education.json';
import awards from '../data/awards.json';
import contact from '../data/contact.json';
import cv from '../data/cv.json';
import researchData from '../data/research.json';
import publicationData from '../data/publications.json';
import skillData from '../data/skills.json';
export interface Media {image?:string; video?:string; alt?:string; caption?:string}
export interface Publication {demo?:boolean;id:string;title:string;authors:string; journal?:string;year?:number;details?:string;doi?:string;pdf?:string;image?:string;alt?:string;featured?:boolean;type:string;status?:string;order?:number}
export interface Research extends Media {id:string;title:string;order?:number;placeholder?:boolean;summary?:string;approach?:string;results?:string;media?:Media[];related?:string[]}
export interface Skill extends Media {name:string;category:string;order?:number;placeholder?:boolean;description?:string;media?:Media[]}
export interface Entry {title:string;institution?:string;date?:string;description?:string}
const order=(a:{order?:number},b:{order?:number})=>(a.order??999)-(b.order??999);
export const publications=(publicationData.entries as Publication[]).sort((a,b)=>(b.year??0)-(a.year??0)||order(a,b));
export const research=(researchData.entries as Research[]).sort(order);
export const skills=(skillData.entries as Skill[]).sort(order);
export {profile,about,education,awards,contact,cv};
