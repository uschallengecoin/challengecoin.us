export function removeAnchorFromElements(selector: string): void {
    // Remove 'id' attributes from selected elements
    document?.querySelectorAll(`${selector} [id]`).forEach(element => {
      element.removeAttribute('id');
    });
  
    // Remove <a> tags while keeping their text
    document?.querySelectorAll(`${selector} a.header-anchor`).forEach(anchor => {
      const text = anchor.textContent;
      if (text !== null) {
        anchor.replaceWith(text); // Replace link with its text
      }
    });
  }