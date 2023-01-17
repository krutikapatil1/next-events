import { Fragment } from "react";
import ErrorAlert from "../../../components/event-detail/error-alert";
import EventContent from "../../../components/event-detail/event-content";
import EventLogistics from "../../../components/event-detail/event-logistics";
import EventSummary from "../../../components/event-detail/event-summary";
import { getEventById, getFeaturedEvents } from "../../../helpers/api_util";
import Head from "next/head";
import Comments from "../../../components/input/comments";

interface EventsDetailPageProps {
  selectedEvent: any;
}

const EventsDetailPage: React.FC<EventsDetailPageProps> = (
  props: EventsDetailPageProps
) => {
  const event = props.selectedEvent;

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
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
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
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export const getStaticProps = async (context: any) => {
  const eventId = context.params.id;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  return {
    fallback: "blocking",
    paths: events?.map((event) => ({
      params: {
        id: event.id.toString(),
      },
    })),
  };
};

export default EventsDetailPage;
