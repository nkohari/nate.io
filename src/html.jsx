import React from 'react';
import Typekit from 'react-typekit';

let styles;
if (process.env.NODE_ENV === `production`) {
  try {
    styles = require(`!raw-loader!../public/styles.css`);
  } catch (err) {
    console.log(err)
  }
}

class Html extends React.Component {

  render() {
    let css;
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      );
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {this.props.headComponents}
          {css}
          <Typekit kitId="dff8dgc" />
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }

}

export default Html;
