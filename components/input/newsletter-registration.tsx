import classes from "./newsletter-registration.module.css";
import { useRef, useContext } from "react";
import NotificationContext from "../../context/notification-context";

const NewsletterRegistration: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const notificationCtx = useContext(NotificationContext);
  const registrationHandler = (event: any) => {
    event.preventDefault();
    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for a newsletter",
      status: "pending",
    });
    fetch("/api/newsletter-registration", {
      method: "POST",
      body: JSON.stringify({
        email: emailInputRef.current?.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) =>
        notificationCtx.showNotification({
          title: "Success!!",
          message: "Successfully registered for newsletter",
          status: "success",
        })
      )
      .catch((error) =>
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Error signing up",
          status: "error",
        })
      );
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
