export const DataTransformation = (data) => {
  return data.slice(8, 10) + '.' + data.slice(5, 7) + '.' + data.slice(0, 4);
};
