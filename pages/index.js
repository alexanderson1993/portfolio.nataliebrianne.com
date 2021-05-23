import Head from "next/head";

import Nav from "@components/Nav";
import Header from "@components/Header";
import Card from "@components/Card";
import Footer from "@components/Footer";

export default function Home({ items }) {
  return (
    <div className="container">
      <Head>
        <title>My Portfolio Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />

      <main>
        <Header text="Welcome to my portfolio!" />

        <div className="cards">
          {items?.length &&
            items.map((i) => {
              return (
                <Card
                  key={i.title}
                  title={i.title}
                  picture={i.image}
                  link={i.slug}
                />
              );
            })}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #2c4b4f;
          color: #d4dddf;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .cards {
          display: flex;
          flex-wrap: wrap;
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

export async function getStaticProps() {
  const portfolioData = await import(`../portfolio.json`);

  return {
    props: {
      items: portfolioData.items.map((item) => ({
        ...item,
        slug: item.title.toLowerCase().split(" ").join("-"),
      })),
    },
  };
}
