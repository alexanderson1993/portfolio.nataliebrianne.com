export default function ContactForm() {
  return (
    <form name="contact" action="/success" method="POST" data-netlify="true">
      <input type="hidden" name="form-name" value="contact" />
      <p>
        <label htmlFor="yourname">Your Name:</label>
        <input type="text" name="name" id="yourname" />
      </p>
      <p>
        <label htmlFor="youremail">Your Email: </label>{" "}
        <input type="email" name="email" id="youremail" />
      </p>
      <p>
        <label htmlFor="yourmessage">Message: </label>
        <textarea name="message" id="yourmessage" rows={5}></textarea>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
      <style jsx>{`
        label {
          font-size: 1.2rem;
        }
        input {
          height: 40px;
        }
        input,
        textarea {
          width: 100%;

          border: none;
          border-bottom: 1px solid #d6d6d6;
          font-size: 1.3rem;
        }

        input:focus,
        textarea:focus {
          outline: 1px dotted #d6d6d6;
        }

        button {
          padding: 1rem;
          background: #1049b6;
          border: solid;
          border-width: 2px;
          border-color: #153b82;
          color: white;
          width: 100%;
          border-radius: 5px;
          font-size: 1.3rem;
          cursor: pointer;
        }
        button:hover {
          background: #2158c1;
        }
        button:focus {
          background: #335492;
        }
      `}</style>
    </form>
  );
}
