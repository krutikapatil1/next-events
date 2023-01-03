import { Fragment } from "react";
import EventsSearch from "../../components/event-detail/events-search";
import EventList from "../../components/event-list";
import { getEvents } from "../../helpers/api_util";
import { useRouter } from "next/router";

interface EventsProps {
  events: any;
}

const Events: React.FC<EventsProps> = (props: EventsProps) => {
  const router = useRouter();

  const searchHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={searchHandler} />
      <EventList items={props.events} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const allEvents = await getEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
};

export default Events;
