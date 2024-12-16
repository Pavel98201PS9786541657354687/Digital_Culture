export const chunkArrayRandomSize = (array) => {
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
