import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/event-list";
const StartingPage = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default StartingPage;
