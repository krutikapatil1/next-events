import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/event-list";
import { Fragment } from "react";
const StartingPage = () => {
  const featuredEvents = getFeaturedEvents();
  return <EventList items={featuredEvents} />;
};

export default StartingPage;
