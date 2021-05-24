import Head from "next/head";

import Nav from "@components/Nav";
import Header from "@components/Header";
import Card from "@components/Card";
import Footer from "@components/Footer";
import path from "path";
import { promises as fs } from "fs";
import remark from "remark";
import html from "remark-html";
import remarkFrontmatter from "remark-frontmatter";
import { load as jsyaml } from "js-yaml";

export default function Home({ items }) {
  const full = items.filter((i) => i.full);
  const single = items.filter((i) => !i.full);
  const portfolio = [];
  let i = 0;
  while (full.length > 0 || single.length > 0) {
    i++;
    let item;
    if (i % 4 === 0) {
      item = full.shift();
    } else {
      item = single.shift();
    }
    if (item) {
      portfolio.push(item);
    }
  }
  return (
    <div className="container">
      <Head>
        <title>Natalie Brianne Art</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />

      <main>
        <div className="cards">
          {portfolio?.length &&
            portfolio.map((i) => {
              return (
                <Card
                  key={i.title}
                  title={i.title}
                  full={i.full}
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
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
          display: grid;
          grid-template-columns: repeat(3, 300px);
          gap: 1rem;
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
          background-color: #2c4b4f;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
export async function getStaticProps() {
  const portfolio = await Promise.all(
    (
      await fs.readdir(path.join(process.cwd(), "content/portfolio"))
    ).map(async (t) => {
      const data = await fs.readFile(
        path.join(process.cwd(), "content/portfolio", t),
        "utf-8"
      );
      const processor = remark()
        .use(html)
        .use(remarkFrontmatter, ["toml", "yaml"]);

      const body = (await processor.process((await data) || "")).toString();
      const parts = jsyaml(processor.parse(await data).children[0].value);
      return {
        slug: t.replace(".md", "").replace(/\s/g, "-"),
        body,
        ...parts,
        image: parts.image?.replace("/public", "") || "",
      };
    })
  );
  return { props: { items: portfolio } };
}
