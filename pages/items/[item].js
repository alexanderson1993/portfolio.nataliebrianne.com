import { Meta } from "@components/Meta";

import Nav from "@components/Nav";
import Header from "@components/Header";
import Footer from "@components/Footer";
import path from "path";
import { promises as fs } from "fs";
import remark from "remark";
import html from "remark-html";
import remarkFrontmatter from "remark-frontmatter";
import { load as jsyaml } from "js-yaml";
export default function Item({ title, body, medium, image }) {
  return (
    <div className="container">
      <Meta title={title} />

      <Nav />

      <main>
        <Header text={title} />
        <img src={image} />
        <small>{medium}</small>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </main>

      <Footer />

      <style jsx>{`
        .container {
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
        img {
          max-width: 960px;
          width: 100%;
          padding: 0 2rem;
        }
        small {
          margin-top: 1rem;
        }
        hr {
          width: 5rem;
          color: currentColor;
          margin: 3rem 0;
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
          color: #d4dddf;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps({ ...ctx }) {
  const item = ctx.params.item;
  let currentItem = "";
  try {
    const filePath = path.join(
      process.cwd(),
      "content/portfolio",
      `${item}.md`
    );

    currentItem = await fs.readFile(filePath, "utf-8");
  } catch (err) {
    return {
      notFound: true,
    };
  }

  if (!currentItem)
    return {
      notFound: true,
    };

  const processor = remark().use(html).use(remarkFrontmatter, ["toml", "yaml"]);
  const body = (await processor.process(currentItem || "")).toString();
  const parts = jsyaml(processor.parse(currentItem).children[0].value);

  return {
    props: {
      slug: item,
      body,
      ...parts,
      image: parts.image?.replace("/public", "") || "",
    },
  };
}

export async function getStaticPaths() {
  const slugs = await Promise.all(
    (
      await fs.readdir(path.join(process.cwd(), "content/portfolio"))
    ).map(async (t) => {
      return t.replace(".md", "").replace(/\s/g, "-");
    })
  );
  let paths = slugs.map((slug) => {
    return { params: { item: slug } };
  });
  return {
    paths,
    fallback: false,
  };
}
