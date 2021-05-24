import { Meta } from "@components/HeadMeta";

import Nav from "@components/Nav";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function Contact() {
  return (
    <div className="container">
      <Meta title="Success!" />

      <Nav />

      <main>
        <Header text="Contact me" />
        Form successfully submitted! I will be in touch shortly.
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
          width: 100%;

          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #2c4b4f;
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
