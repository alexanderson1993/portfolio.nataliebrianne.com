import Link from "next/link";
import Img from "next/image";

export default function Card({ title, picture, link, full }) {
  return (
    <>
      <Link href={`/items/${link}`}>
        <a className={`card ${full ? "full" : ""}`}>
          <Img
            src={picture}
            alt={title}
            width={full ? 932 : 300}
            height={350}
            objectFit="cover"
            style={{ borderRadius: "5px" }}
          />
        </a>
      </Link>
      <style jsx>{`
        a {
          color: black;
          text-decoration: none;
        }
        .card {
          height: 350px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 5px;
          transition: box-shadow 0.5s;
          cursor: pointer;
        }
        .card:hover {
          box-shadow: 0 1.7px 1.6px rgba(0, 0, 0, 0.04),
            0 4.3px 4.4px rgba(0, 0, 0, 0.058),
            0 8.9px 9.5px rgba(0, 0, 0, 0.072),
            0 18.3px 21.4px rgba(0, 0, 0, 0.09), 0 50px 80px rgba(0, 0, 0, 0.13);
        }
        .card.full {
          grid-column: 1 / span 3;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          object-fit: cover;
        }
      `}</style>
    </>
  );
}
