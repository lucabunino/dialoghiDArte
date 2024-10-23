export function formatSubstring(content, searchString, spanClass = '') {
  if (!content || !searchString) return content; // Check if content or searchString is empty

  // Create a span with optional class
  const spanOpen = spanClass ? `<span class="${spanClass}">` : '<span>';
  const spanClose = '</span>';

  // Create a regular expression to find the search string (case-insensitive)
  const regex = new RegExp(`(${searchString})`, 'gi');

  // Replace the searchString with itself wrapped in a <span>
  return content.replace(regex, `${spanOpen}$1${spanClose}`);
}

// // Example usage:
// const content = "This is a test content.";
// const result = formatSubstring(content, "test", "highlight");
// console.log(result);  // Outputs: This is a <span class="highlight">test</span> content.