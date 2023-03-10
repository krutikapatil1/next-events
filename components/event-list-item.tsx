import Button from "./ui/button";
import classes from "./event-list-item.module.css";
import AddressIcon from "./icons/address-icon";
import DateIcon from "./icons/date-icon";
import ArrowRightIcon from "./icons/arrow-right-icon";
import Image from "next/image";

interface EventListItemParams {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
}

const EventDetail: React.FC<EventListItemParams> = (
  props: EventListItemParams
) => {
  const { title, image, date, location, id } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const exploreLink = `events/${id}`;

  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={title} width={640} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventDetail;
