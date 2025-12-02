// Draft.js content types
interface DraftBlock {
  type: string;
  text: string;
  inlineStyleRanges?: Array<{
    offset: number;
    length: number;
    style: string;
  }>;
}

interface DraftContent {
  blocks: DraftBlock[];
}

/**
 * Convert Draft.js raw JSON to HTML
 * @param rawContent - Draft.js raw content (string or object)
 * @returns HTML string
 */
export const draftToHtml = (rawContent: string | DraftContent | null): string => {
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
    const draftContent = content as DraftContent;
    if (!draftContent || !draftContent.blocks) {
      return typeof rawContent === 'string' ? `<p>${rawContent}</p>` : '';
    }

    const htmlBlocks = draftContent.blocks.map((block: DraftBlock) => {
      let text = block.text || '';

      // Apply inline styles
      if (block.inlineStyleRanges && block.inlineStyleRanges.length > 0) {
        // Create array of characters with their styles
        interface CharStyle {
          char: string;
          bold: boolean;
          italic: boolean;
          underline: boolean;
          code: boolean;
          color?: string;
          bgcolor?: string;
          fontSize?: string;
          fontFamily?: string;
        }

        const chars: CharStyle[] = [];
        for (let i = 0; i < text.length; i++) {
          chars.push({
            char: text[i],
            bold: false,
            italic: false,
            underline: false,
            code: false
          });
        }

        // Apply all styles to each character
        block.inlineStyleRanges.forEach((range: { offset: number; length: number; style: string }) => {
          for (let i = range.offset; i < range.offset + range.length && i < chars.length; i++) {
            const style = range.style;

            if (style === 'BOLD') {
              chars[i].bold = true;
            } else if (style === 'ITALIC') {
              chars[i].italic = true;
            } else if (style === 'UNDERLINE') {
              chars[i].underline = true;
            } else if (style === 'CODE') {
              chars[i].code = true;
            } else if (style.startsWith('color-')) {
              chars[i].color = style.replace('color-', '');
            } else if (style.startsWith('bgcolor-')) {
              chars[i].bgcolor = style.replace('bgcolor-', '');
            } else if (style.startsWith('fontsize-')) {
              const size = style.replace('fontsize-', '');
              // Convert Draft.js font sizes to CSS
              if (size === 'small') chars[i].fontSize = '12px';
              else if (size === 'medium') chars[i].fontSize = '16px';
              else if (size === 'large') chars[i].fontSize = '18px';
              else if (size.endsWith('pt')) chars[i].fontSize = size.replace('pt', 'px');
              else chars[i].fontSize = size;
            } else if (style.startsWith('fontfamily-')) {
              chars[i].fontFamily = style.replace('fontfamily-', '');
            }
          }
        });

        // Build styled text by grouping consecutive characters with same styles
        let styledText = '';
        let i = 0;

        while (i < chars.length) {
          const currentChar = chars[i];

          // Find consecutive characters with same styles
          let j = i + 1;
          while (j < chars.length &&
                 chars[j].bold === currentChar.bold &&
                 chars[j].italic === currentChar.italic &&
                 chars[j].underline === currentChar.underline &&
                 chars[j].code === currentChar.code &&
                 chars[j].color === currentChar.color &&
                 chars[j].bgcolor === currentChar.bgcolor &&
                 chars[j].fontSize === currentChar.fontSize &&
                 chars[j].fontFamily === currentChar.fontFamily) {
            j++;
          }

          // Extract text segment
          let segment = chars.slice(i, j).map(c => c.char).join('');

          // Build inline style
          const inlineStyles: string[] = [];
          if (currentChar.color) {
            inlineStyles.push(`color: ${currentChar.color}`);
          }
          if (currentChar.bgcolor) {
            inlineStyles.push(`background-color: ${currentChar.bgcolor}`);
          }
          if (currentChar.fontSize) {
            inlineStyles.push(`font-size: ${currentChar.fontSize}`);
          }
          if (currentChar.fontFamily) {
            inlineStyles.push(`font-family: ${currentChar.fontFamily}`);
          }

          // Apply semantic tags
          if (currentChar.bold) segment = `<strong>${segment}</strong>`;
          if (currentChar.italic) segment = `<em>${segment}</em>`;
          if (currentChar.underline) segment = `<u>${segment}</u>`;
          if (currentChar.code) segment = `<code>${segment}</code>`;

          // Wrap with span if inline styles exist
          if (inlineStyles.length > 0) {
            segment = `<span style="${inlineStyles.join('; ')}">${segment}</span>`;
          }

          styledText += segment;
          i = j;
        }

        text = styledText;
      }

      // Convert newlines to <br> tags
      text = text.replace(/\n/g, '<br>');

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

    draftContent.blocks.forEach((block: DraftBlock, index: number) => {
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
