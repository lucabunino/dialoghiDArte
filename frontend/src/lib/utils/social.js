export function formatSocial(url) {
  const patterns = {
    instagram: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^\/?#]+)/i,
    x: /(?:https?:\/\/)?(?:www\.)?(twitter\.com|x\.com)\/([^\/?#]+)/i, // Match both twitter.com and x.com
    facebook: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/([^\/?#]+)/i,
    youtube: /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:user\/|channel\/)?([^\/?#]+)/i,
    pinterest: /(?:https?:\/\/)?(?:www\.)?pinterest\.com\/([^\/?#]+)/i
  };

  for (const [platform, pattern] of Object.entries(patterns)) {
    const match = url.match(pattern);
    if (match) {
      const profileName = platform === 'x' ? `@${match[2]}` : `@${match[1]}`; // Handle both twitter and x.com
      return [platform, profileName];
    }
  }
  return ['unknown', ''];
}