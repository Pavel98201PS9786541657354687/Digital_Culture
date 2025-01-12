type Video = {
  description: string;
  fileName: string;
  formatVideo: "vertical" | "horizontal" | "quadratic";
  title: string;
  weight: number;
}

const mapColSpanByFormat = {
  "vertical": 1,
  "horizontal": 3,
  "quadratic": 2
}

export const chunkGridItems = (array: Video[]) => {
  const result = [];

  let i = 0;
  while (i < array.length) {
    const size = Math.floor(Math.random() * 3) + 1;
    const chunk = array.slice(i, i + size)?.map((item, index) => ({
      ...item,
      id: i + index,
    }));
    result.push(chunk);
    i += size; // Увеличиваем индекс на размер группы
  }

  return result;
};

export const getGridChunksByFileFormats = (array: Video[]) => {
  if (!array?.length) {
    return [];
  }
  const items = array?.map((file, index) => (
    {...file, colSpan: mapColSpanByFormat[file?.formatVideo]}
  ));

  const lineGroup = [];

  let i = 0;
  while (i < items.length) {
    const chunk = [];
    let chunkSpan = 0;
    while (chunkSpan < 3 && i < items.length) {
      const currentItem = items[i];

      if (currentItem?.colSpan && chunkSpan + currentItem.colSpan <= 3) {
        chunk.push(currentItem);
        chunkSpan += currentItem.colSpan;
        i++;
      } else {
        i++;
      }
    }
    lineGroup.push(chunk);
  }

  return lineGroup;
}
