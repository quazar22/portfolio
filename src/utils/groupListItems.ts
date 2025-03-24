export function groupListItems(blocks: any[]) {
    const grouped: any[] = [];
    let currentList: null | {
        _type: 'list';
        listType: 'bullet' | 'number';
        items: any[];
    } = null;

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const { listItem } = block;

        if (listItem === 'bullet' || listItem === 'number') {
            if (!currentList || currentList.listType !== listItem) {
                if (currentList) {
                    grouped.push(currentList);
                }
                currentList = {
                    _type: 'list',
                    listType: listItem,
                    items: [block],
                };
            } else {
                currentList.items.push(block);
            }
        } else {
            if (currentList) {
                grouped.push(currentList);
                currentList = null;
            }
            grouped.push(block);
        }
    }

    if (currentList) {
        grouped.push(currentList);
    }

    return grouped;
}