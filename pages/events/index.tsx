import { Fragment } from "react";
import EventsSearch from "../../components/event-detail/events-search";
import EventList from "../../components/event-list";
import { getEvents } from "../../helpers/api_util";
import { useRouter } from "next/router";
import Head from "next/head";

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
      <Head>
        <title>All Events</title>
        <meta name="description" content="A list of all the events" />
      </Head>
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
