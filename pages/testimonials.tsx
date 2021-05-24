import Head from "next/head";

import Nav from "@components/Nav";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { promises as fs } from "fs";
import path from "path";
import remark from "remark";
import html from "remark-html";
import remarkFrontmatter from "remark-frontmatter";

export async function getStaticProps() {
  const testimonials = await Promise.all(
    (
      await fs.readdir(path.join(process.cwd(), "content/testimonials"))
    )
      .map(
        async (t) =>
          await fs.readFile(
            path.join(process.cwd(), "content/testimonials", t),
            "utf-8"
          )
      )
      .map(async (data) => {
        const processor = remark()
          .use(html)
          .use(remarkFrontmatter, ["toml", "yaml"]);
        processor.parse(await data);
      })
  );
  console.log(testimonials);
  return { props: {} };
}
export default function Testimonials() {
  return (
    <div className="container">
      <Head>
        <title>Natalie Brianne Art | Testimonials</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main>
        <Header text="Contact me" />
        Form successfully submitted!
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
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #2c4b4f;
          color: #d4dddf;
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
