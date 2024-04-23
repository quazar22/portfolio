export interface Page {
  title: string;
  redirect?: string;
}

export const pages: Page[] = [
  { title: 'About Me' }, 
  { title: 'Experience' }, 
  { title: 'Projects' }, 
  { title: 'Contact' }
];
const createPageId = (page: string) => page.toLowerCase().replace(" ", "");
export const pageIds = pages.map(page => createPageId(page.title));

const pageIdMap = new Map<string, string>();
pageIds.forEach((pageId, index) => pageIdMap.set(pageId, pages[index].title));

export const getPageId = (page: string) => pageIds[pages.findIndex(p => p.title === page)];