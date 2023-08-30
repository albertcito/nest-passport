interface KeyStringValue {
  [key: string]: any;
}

const getIds = (items: KeyStringValue[], key: string) => {
  const ids: (number | string)[] = [];
  items.forEach((item) => {
    if (key in item) {
      const value = item[key];
      if (value) {
        ids.push(value);
      }
    }
  });
  return ids;
};

export default getIds;
