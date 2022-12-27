import { Fragment } from "react";
import EventsSearch from "../../components/event-detail/events-search";
import EventList from "../../components/event-list";
import { getAllEvents } from "../../dummy-data";
import { useRouter } from "next/router";

const Events = () => {
  const events = getAllEvents();
  const router = useRouter();

  const searchHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={searchHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default Events;
