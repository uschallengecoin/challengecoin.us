export default function({ assets }) {
  // adjust the regex accordingly to match your font
  // const myFontFile = assets.find((file) => file.match(/Avenir[-a-zA-Z0-9.]+\.[woff2|ttf|eot|svg]/));

  const fontNames = ['Inter', 'TestTiemposHeadline'];
  const fontRegex = new RegExp(`(${fontNames.join('|')})[-a-zA-Z0-9.]+\\.(woff2|ttf|eot|svg)`);
  const myFontFile = assets.find((file) => file.match(fontRegex));
  if (myFontFile) {
    const ext = myFontFile.split('.').pop();
    return [
      [
        'link',
        {
          rel: 'preload',
          href: myFontFile,
          as: 'font',
          type: `font/${ext}`,
          crossorigin: '',
        },
      ],
    ];
  }
};