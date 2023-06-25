export const pages = ['About Me', 'Experience', 'Projects', 'Contact'];
const createPageId = (page: string) => page.toLowerCase().replace(" ", "");
export const pageIds = pages.map(page => createPageId(page));

const pageIdMap = new Map<string, string>();
pageIds.forEach((pageId, index) => pageIdMap.set(pageId, pages[index]));

export const getPageId = (page: string) => pageIds[pages.indexOf(page)];