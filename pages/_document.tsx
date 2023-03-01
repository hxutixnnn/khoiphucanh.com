import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Công cụ khôi phục những hình ảnh bị mờ và lưu giữ lại những kỷ niệm với chất lượng tốt hơn. Hoàn toàn miễn phí - Khôi phục ảnh của bạn ngay hôm nay."
          />
          <meta property="og:site_name" content="khoiphucanh.com" />
          <meta
            property="og:description"
            content="Công cụ khôi phục những hình ảnh bị mờ và lưu giữ lại những kỷ niệm với chất lượng tốt hơn. Hoàn toàn miễn phí - Khôi phục ảnh của bạn ngay hôm nay."
          />
          <meta property="og:title" content="Khôi phục ảnh cũ chất lượng cao" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Khôi phục ảnh cũ chất lượng cao" />
          <meta
            name="twitter:description"
            content="Công cụ khôi phục những hình ảnh bị mờ và lưu giữ lại những kỷ niệm với chất lượng tốt hơn. Hoàn toàn miễn phí - Khôi phục ảnh của bạn ngay hôm nay."
          />
          <meta
            property="og:image"
            content="/og-image.png"
          />
          <meta
            name="twitter:image"
            content="/og-image.png"
          />
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
