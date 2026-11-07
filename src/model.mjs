export const PROFILE_KEY = '@little-lemon/profile-v1';
export const emptyProfile = {firstName:'', lastName:'', email:'', phone:'', orderUpdates:true, newsletter:false};
export function validProfile(p) { return !!p && !!p.firstName.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email.trim()); }
export function normalizeProfile(p) {return {...emptyProfile,...p,firstName:p.firstName.trim(),lastName:(p.lastName||'').trim(),email:p.email.trim(),phone:(p.phone||'').trim()};}
export function filterMenu(menu, query='', categories=[]) {const q=query.trim().toLowerCase();return menu.filter(x=>(!categories.length||categories.includes(x.category))&&(!q||(x.title+' '+x.description).toLowerCase().includes(q)));}
export async function readProfile(storage) {const raw=await storage.getItem(PROFILE_KEY);if(!raw)return null;try {const p=JSON.parse(raw);return validProfile(p)?normalizeProfile(p):null;}catch{return null;}}
export async function writeProfile(storage,p) {if(!validProfile(p))throw new Error('Enter a first name and a valid email address.');const value=normalizeProfile(p);await storage.setItem(PROFILE_KEY,JSON.stringify(value));return value;}
export async function clearProfile(storage) {await storage.removeItem(PROFILE_KEY);}
