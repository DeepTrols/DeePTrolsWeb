/** 数组上移/下移（delta = -1 | 1），越界不动 */
export function moveItem<T>(list: T[], index: number, delta: number) {
  const target = index + delta;
  if (target < 0 || target >= list.length) {
    return;
  }
  const [item] = list.splice(index, 1);
  if (item === undefined) {
    return;
  }
  list.splice(target, 0, item);
}

/** 删除第 index 项 */
export function del<T>(list: T[], index: number) {
  list.splice(index, 1);
}

/** 逗号分隔文本 ↔ string[]（activePaths 编辑用）；空文本 → undefined（不落空数组） */
export function pathsToText(paths?: string[]): string {
  return (paths ?? []).join(', ');
}

export function textToPaths(text: string): string[] | undefined {
  const list = text
    .split(/[，,]/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  return list.length > 0 ? list : undefined;
}
