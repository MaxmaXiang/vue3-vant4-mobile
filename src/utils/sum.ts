import {Item} from '@/store/modules/mouse'
export function sumItemValues(items: Item[]): number {
    return items.reduce((total, item) => {
      // 如果item.type符合条件，并且value不为空，则累加
      if (item.value !== null) {
        const value = parseFloat(item.value);
        if (!isNaN(value)) {
          total += value;
        }
      }
      // 如果存在children，递归调用sumItemValues
      if (item.children && item.children.length > 0) {
        total += sumItemValues(item.children);
      }
      return total;
    }, 0);
  }