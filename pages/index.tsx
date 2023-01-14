// import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/event-list";
import { getFeaturedEvents } from "../helpers/api_util";
import Head from "next/head";

interface StartingPageProps {
  events?: any;
}

const StartingPage: React.FC<StartingPageProps> = (
  props: StartingPageProps
) => {
  return (
    <div>
      <Head>
        <title>Next Js Events</title>
        <meta
          name="description"
          content="A list of events for you to evolve..."
        />
      </Head>
      <EventList items={props.events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};

export default StartingPage;
