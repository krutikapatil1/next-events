import classes from "./newsletter-registration.module.css";
import { useRef } from "react";

const NewsletterRegistration: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const registrationHandler = (event: any) => {
    event.preventDefault();
    fetch("/api/newsletter-registration", {
      method: "POST",
      body: JSON.stringify({
        email: emailInputRef.current?.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
