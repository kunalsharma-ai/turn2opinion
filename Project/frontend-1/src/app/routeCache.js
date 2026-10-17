// Caches loaded page modules and route data so that hydration renders synchronously
// and repeat navigations are instant.
import { matchRoute } from '../routes.js';

const pages = new Map(); // route.path -> component
const datas = new Map(); // concrete path -> data

export async function preloadPath(path) {
  const { route, params, notFound } = matchRoute(path);
  const tasks = [];
  if (!pages.has(route.path)) tasks.push(route.load().then((m) => pages.set(route.path, m.default)));
  if (route.data && !datas.has(path)) tasks.push(Promise.resolve(route.data(params)).then((d) => datas.set(path, d)));
  await Promise.all(tasks);
  return { route, params, notFound };
}

export const getPage = (route) => pages.get(route.path);
export const getData = (path) => datas.get(path);
export const isReady = (route, path) => pages.has(route.path) && (!route.data || datas.has(path));
