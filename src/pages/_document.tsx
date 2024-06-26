
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Указываем путь к вашему логотипу */}
          <link rel="icon" href="/tab-logo.png" type="image/png" />
          {/* Если у вас есть другие метаданные, вы можете добавить их здесь */}
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
