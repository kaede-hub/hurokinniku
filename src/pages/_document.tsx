import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      
      <Head>
      <link rel="manifest" href="/manifest.json" />
      </Head>
      <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}
            async
            defer
            crossOrigin="anonymous"
          />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}