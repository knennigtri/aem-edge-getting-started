export default function decorate(block) {
  // Process each paragraph in the block
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      // Process all paragraphs and text nodes
      const paragraphs = col.querySelectorAll('p');
      paragraphs.forEach((p) => {
        const text = p.textContent.trim();
        
        // Check if the paragraph starts with ">"
        if (text.startsWith('>')) {
          // Create a blockquote element
          const blockquote = document.createElement('blockquote');
          
          // Remove the ">" and any following whitespace from the beginning
          const quoteText = text.substring(1).trim();
          
          // Preserve any existing formatting by moving innerHTML instead of textContent
          if (quoteText) {
            // Create a new paragraph for the quote content
            const quoteParagraph = document.createElement('p');
            quoteParagraph.innerHTML = p.innerHTML.replace(/^&gt;\s*/, '').replace(/^>\s*/, '');
            blockquote.appendChild(quoteParagraph);
          }
          
          // Replace the original paragraph with the blockquote
          p.replaceWith(blockquote);
        }
      });
    });
  });
}
