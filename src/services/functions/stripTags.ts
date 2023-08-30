/**
 * Source from: https://github.com/locutusjs/locutus/blob/master/src/php/strings/strip_tags.js
 *
 * var str = strip_tags(
 *  '<p>There is some <u>text</u> here</p>',
 *  '<b><i><u><p><ol><ul>' // Allowed tags
 * );
 */
const stripTags = (input: string, tagsAllowed?: string, encode?: boolean) => {
  // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  const allowed = (
    `${tagsAllowed || ''}`.toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []
  ).join('');

  const tags = /<\/?([a-z0-9]*)\b[^>]*>?/gi;
  const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

  // removes tha '<' char at the end of the string to replicate PHP's behaviour
  let after =
    input.substring(input.length - 1) === '<'
      ? input.substring(0, input.length - 1)
      : input;

  // recursively remove tags to ensure that the returned string doesn't
  // contain forbidden tags after previous passes (e.g. '<<bait/>switch/>')
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const before = after;
    after = before.replace(commentsAndPhpTags, '').replace(tags, (tag, $1) => {
      if (allowed.indexOf(`<${$1.toLowerCase()}>`) > -1) {
        return tag;
      }
      if (encode) {
        return tag.replace('<', '&lt;').replace('>', '&gt;');
      }
      return '';
    });

    // return once no more tags are removed
    if (before === after) {
      return after;
    }
  }
};

export default stripTags;
