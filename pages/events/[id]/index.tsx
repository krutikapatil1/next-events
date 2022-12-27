import { useRouter } from "next/router";
import { Fragment } from "react";
import ErrorAlert from "../../../components/event-detail/error-alert";
import EventContent from "../../../components/event-detail/event-content";
import EventLogistics from "../../../components/event-detail/event-logistics";
import EventSummary from "../../../components/event-detail/event-summary";
import { getEventById } from "../../../dummy-data";

const EventsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const event = getEventById(id);

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Event not found!</p>
        </ErrorAlert>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventsDetailPage;
