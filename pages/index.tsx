// import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/event-list";
import { getFeaturedEvents } from "../helpers/api_util";

interface StartingPageProps {
  events?: any;
}

const StartingPage: React.FC<StartingPageProps> = (
  props: StartingPageProps
) => {
  return <EventList items={props.events} />;
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
