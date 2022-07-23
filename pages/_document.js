import { Html, Head, Main, NextScript } from 'next/document'
import 'dotenv/config';

export default function Document() {
  return (
    <Html>
      <Head/>
      <body>
        <Main />
        <NextScript />
        <style jsx global>{`
            /* Other global styles such as 'html, body' etc... */

            html, body, #__next {
              height: 100%;
            }
          `}</style>
        <div id="modal-root"></div>
        <div id="addCoinModal-root"></div>
      </body>
    </Html>
  )
}
