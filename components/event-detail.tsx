import Link from "next/link";

interface EventDetailParams {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
}

const EventDetail: React.FC<EventDetailParams> = (props: EventDetailParams) => {
  const { title, image, date, location, id } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const exploreLink = `events/${id}`;

  return (
    <li>
      <img src={"/" + image} alt={title} />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{humanReadableDate}</time>
          </div>
          <div>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div>
          <Link href={exploreLink}>EXPLORE EVENT</Link>
        </div>
      </div>
    </li>
  );
};

export default EventDetail;
