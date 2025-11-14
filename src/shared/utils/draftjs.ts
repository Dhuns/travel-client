/**
 * Convert Draft.js raw JSON to HTML
 * @param rawContent - Draft.js raw content (string or object)
 * @returns HTML string
 */
export const draftToHtml = (rawContent: string | any): string => {
  try {
    // If rawContent is empty or null, return empty string
    if (!rawContent) {
      return '';
    }

    // If it's a string, check if it's JSON before parsing
    let content = rawContent;
    if (typeof rawContent === 'string') {
      const trimmed = rawContent.trim();
      // If it looks like JSON (starts with { or [), try to parse it
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
          content = JSON.parse(trimmed);
        } catch (parseError) {
          // If parsing fails, treat as plain text
          return `<p>${rawContent}</p>`;
        }
      } else {
        // Plain text, return as-is wrapped in paragraph
        return `<p>${rawContent}</p>`;
      }
    }

    // Check if it's valid Draft.js content
    if (!content || !content.blocks) {
      return typeof rawContent === 'string' ? `<p>${rawContent}</p>` : '';
    }

    const htmlBlocks = content.blocks.map((block: any) => {
      let text = block.text || '';

      // Apply inline styles
      if (block.inlineStyleRanges && block.inlineStyleRanges.length > 0) {
        const ranges = [...block.inlineStyleRanges].sort((a, b) => a.offset - b.offset);
        let styledText = '';
        let lastIndex = 0;

        ranges.forEach((range) => {
          // Add text before this range
          styledText += text.substring(lastIndex, range.offset);

          // Add styled text
          const rangeText = text.substring(range.offset, range.offset + range.length);
          let wrappedText = rangeText;

          switch (range.style) {
            case 'BOLD':
              wrappedText = `<strong>${rangeText}</strong>`;
              break;
            case 'ITALIC':
              wrappedText = `<em>${rangeText}</em>`;
              break;
            case 'UNDERLINE':
              wrappedText = `<u>${rangeText}</u>`;
              break;
            case 'CODE':
              wrappedText = `<code>${rangeText}</code>`;
              break;
            default:
              wrappedText = rangeText;
          }

          styledText += wrappedText;
          lastIndex = range.offset + range.length;
        });

        // Add remaining text
        styledText += text.substring(lastIndex);
        text = styledText;
      }

      // Wrap in appropriate HTML tag based on block type
      switch (block.type) {
        case 'header-one':
          return `<h1>${text}</h1>`;
        case 'header-two':
          return `<h2>${text}</h2>`;
        case 'header-three':
          return `<h3>${text}</h3>`;
        case 'header-four':
          return `<h4>${text}</h4>`;
        case 'header-five':
          return `<h5>${text}</h5>`;
        case 'header-six':
          return `<h6>${text}</h6>`;
        case 'blockquote':
          return `<blockquote>${text}</blockquote>`;
        case 'code-block':
          return `<pre><code>${text}</code></pre>`;
        case 'unordered-list-item':
          return `<li>${text}</li>`;
        case 'ordered-list-item':
          return `<li>${text}</li>`;
        case 'unstyled':
        default:
          return text ? `<p>${text}</p>` : '<p><br></p>';
      }
    });

    // Group list items into ul/ol tags
    let html = '';
    let inList: 'ul' | 'ol' | null = null;

    content.blocks.forEach((block: any, index: number) => {
      if (block.type === 'unordered-list-item') {
        if (inList !== 'ul') {
          if (inList) html += `</${inList}>`;
          html += '<ul>';
          inList = 'ul';
        }
        html += htmlBlocks[index];
      } else if (block.type === 'ordered-list-item') {
        if (inList !== 'ol') {
          if (inList) html += `</${inList}>`;
          html += '<ol>';
          inList = 'ol';
        }
        html += htmlBlocks[index];
      } else {
        if (inList) {
          html += `</${inList}>`;
          inList = null;
        }
        html += htmlBlocks[index];
      }
    });

    // Close any open list
    if (inList) {
      html += `</${inList}>`;
    }

    return html;
  } catch (error) {
    console.error('Error converting Draft.js to HTML:', error);
    // If it's already HTML or plain text, return as-is
    return typeof rawContent === 'string' ? rawContent : '';
  }
};
