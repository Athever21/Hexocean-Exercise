export default (src: string) =>
  `<!DOCTYPE HTML>
  <html lang="eng">
    <head>
      <title>Hexocean Exercise</title>
      <meta charset="utf-8">
    </head>
    <body bgcolor="#202020">
      <div id="root"></div>
      ${src}
    </body>
  </html>
  `;
