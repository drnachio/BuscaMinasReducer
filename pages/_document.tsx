/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  public static async getInitialProps(ctx): Promise<any> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = (): any =>
        originalRenderPage({
          enhanceApp: (App) => (props): React.ReactElement =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  public render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" type="text/css" href="/css/reset.css" />
          <link rel="stylesheet" type="text/css" href="/css/default.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
