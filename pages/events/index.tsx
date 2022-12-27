import EventList from "../../components/event-list";
import { getAllEvents } from "../../dummy-data";

const Events = () => {
  const events = getAllEvents();
  return <EventList items={events} />;
};

export default Events;
