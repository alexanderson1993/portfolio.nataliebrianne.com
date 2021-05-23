import Head from "next/head";

import Nav from "@components/Nav";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function Item({ title, description, image }) {
  return (
    <div className="container">
      <Head>
        <title>My Portfolio | {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main>
        <Header text={title} />
        <p>{description}</p>
        <img src={image} />
      </main>

      <Footer />

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps({ ...ctx }) {
  const portfolioData = await import(`../../portfolio.json`);

  let currentItem = portfolioData.items.find((i) => {
    return i.title.toLowerCase().split(" ").join("-") === ctx.params.item;
  });

  if (!currentItem)
    return {
      notFound: true,
    };
  let { title, description, image } = currentItem;

  return {
    props: {
      title,
      description,
      image,
    },
  };
}

export async function getStaticPaths() {
  const portfolioData = await import(`../../portfolio.json`);
  let slugs = portfolioData.items.map((i) =>
    i.title.toLowerCase().split(" ").join("-")
  );
  let paths = slugs.map((slug) => {
    return { params: { item: slug } };
  });

  return {
    paths,
    fallback: false,
  };
}
