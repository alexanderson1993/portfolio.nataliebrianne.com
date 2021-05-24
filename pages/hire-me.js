import Head from "next/head";

import Nav from "@components/Nav";
import Header from "@components/Header";
import Footer from "@components/Footer";
import ContactForm from "@components/ContactForm";
import fs from "fs";
import path from "path";
import remark from "remark";
import html from "remark-html";

export async function getStaticProps() {
  const hireMe = fs.readFileSync(
    path.join(process.cwd(), "content/hireme.md"),
    "utf-8"
  );
  const markdown = await remark()
    .use(html)
    .process(hireMe || "");
  const content = markdown.toString();
  return { props: { content } };
}
export default function Contact({ content }) {
  return (
    <div className="container">
      <Head>
        <title>My Portfolio | Hire Me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main>
        <Header text="Hire me" />
        <div className="flex-container">
          <div
            className="text-content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <ContactForm />
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .flex-container {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        .text-content {
          flex: 1;
          font-size: 1.2rem;
          margin-right: 2rem;
        }
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #2c4b4f;
          color: #d4dddf;
        }

        main {
          padding: 5rem 1rem;
          flex: 1;
          width: 100%;
          max-width: 960px;
          display: flex;
          flex-direction: column;
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
          background-color: #2c4b4f;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
