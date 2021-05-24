import Head from "next/head";

export function Meta({ title }: { title?: string }) {
  console.log(title);
  return (
    <Head>
      <title>Natalie Brianne Art{title ? ` | ${title}` : ""}</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="apple-mobile-web-app-title" content="Natalie Brianne Art" />
      <meta name="application-name" content="Natalie Brianne Art" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="theme-color" content="#ffffff"></meta>
    </Head>
  );
}
