import { Meta } from "@components/Meta";
import { Fragment } from "react";
import Nav from "@components/Nav";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { promises as fs } from "fs";
import path from "path";
import remark from "remark";
import html from "remark-html";
import remarkFrontmatter from "remark-frontmatter";
import { load as jsyaml } from "js-yaml";

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
        const parts: any = jsyaml(
          (processor.parse(await data).children as any)[0].value
        );
        const body = (await processor.process((await data) || "")).toString();

        return { ...parts, body };
      })
  );
  return { props: { testimonials } };
}
export default function Testimonials({
  testimonials,
}: {
  testimonials: { name: string; body: string }[];
}) {
  return (
    <div className="container">
      <Meta title="Testimonials" />

      <Nav />

      <main>
        <Header text="Testimonials" />
        <dl>
          {testimonials.map((t) => (
            <Fragment key={t.name}>
              <dt>{t.name}</dt>
              <dd dangerouslySetInnerHTML={{ __html: t.body }}></dd>
            </Fragment>
          ))}
        </dl>
      </main>

      <Footer />

      <style jsx>{`
        .container {
          min-height: 100vh;
          width: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          width: 100%;
          max-width: 960px;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #2c4b4f;
          color: #d4dddf;
        }
        dt {
          font-size: 1.6rem;
          font-weight: bold;
        }
        dd {
          line-height: 1.8;
        }
        dd:after {
          content: "";
          display: inline-block;
          text-align: center;
          width: 5rem;
          border-bottom: solid 1px currentcolor;
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
