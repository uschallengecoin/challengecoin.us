export default function({ assets }) {
  const fontNames = ['Inter', 'TiemposHeadline'];
  const fontRegex = new RegExp(`(${fontNames.join('|')})[-a-zA-Z0-9.]+\\.(woff2|ttf|eot|svg)`);
  
  // Get all matching font files
  const matchedFonts = assets.filter((file) => fontRegex.test(file));
  
  // Map each font file to a preload link config
  return matchedFonts.map((fontFile) => {
    const ext = fontFile.split('.').pop();
    return [
      'link',
      {
        rel: 'preload',
        href: fontFile,
        as: 'font',
        type: `font/${ext}`,
        crossorigin: '',
      },
    ];
  });
}
