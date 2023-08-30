type toReplaceArray = '&' | '<' | '>';
type TagsToReplaceProperties = {
  [key in toReplaceArray]: string;
};
const getTagToReplace = (toReplace: toReplaceArray[]) => {
  const tagsToReplace: TagsToReplaceProperties = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };
  const replace: Partial<TagsToReplaceProperties> = {};
  toReplace.forEach((key) => {
    replace[key] = tagsToReplace[key];
  });
  return tagsToReplace;
};

const encode = (text: string, replace: toReplaceArray[] = ['<', '>']) => {
  const tagsToReplace = getTagToReplace(replace);
  const regExp = '[&<>"]';
  return text.replace(new RegExp(regExp, 'g'), (tag) => {
    const key = tag as toReplaceArray;
    return tagsToReplace[key] ?? tag;
  });
};

export default encode;
