import Link from "next/link";
import Wordmark from "./wordmark";

export default function Nav() {
  return (
    <nav className="nav" role="navigation" aria-label="main navigation">
      <div className="logo">
        <img
          src="/images/logo-square.svg"
          alt="A logo of a paintbrush over a canvas"
        />
        <img
          className="wordmark"
          src="/images/wordmark.svg"
          alt="Natalie Brianne"
        />
      </div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/testimonials">
          <a>Testimonials</a>
        </Link>
        <Link href="/hire-me">
          <a>Hire Me</a>
        </Link>
      </div>
      <style jsx>{`
        .logo img {
          height: 80%;
        }
        .logo .wordmark {
          height: 50%;
        }
        .logo {
          display: flex;
          align-items: center;
          height: 100%;
        }
        .logo > * {
          margin-left: 1rem;
          margin-right: 1rem;
        }
        nav {
          width: 100%;
          height: 92px;
          background-color: #c6dee5;
          border-bottom: 1px solid #eaeaea;
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-weight: 300;
          font-size: 1.2rem;
          text-align: center;
        }
        nav a {
          margin-right: 20px;
          color: #011a20;
          text-decoration: none;
        }
        nav a:hover {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
}
