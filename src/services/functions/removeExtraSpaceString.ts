/**
 * Remove extra spaces from current string and trim the string
 */
const removeExtraSpaces = (text: string) => text.replace(/\s+/g, ' ').trim();
export default removeExtraSpaces;
