import React from 'react';

let styles;
if (process.env.NODE_ENV === `production`) {
  try {
    styles = require(`!raw-loader!../public/styles.css`);
  } catch (err) {
    console.log(err);
  }
}

const Html = props => {
  let css;
  if (process.env.NODE_ENV === `production`) {
    css = <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{ __html: styles }} />;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {props.headComponents}
        {css}
      </head>
      <body>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  );
};

export default Html;
