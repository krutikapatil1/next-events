import { Fragment } from "react";
import ErrorAlert from "../../components/event-detail/error-alert";
import ResultsTitle from "../../components/event-detail/results-title";
import EventList from "../../components/event-list";
import Button from "../../components/ui/button";
import { getFilteredEvents } from "../../helpers/api_util";

interface EventsFilterPageParams {
  hasError: boolean;
  events: any;
  date: any;
}

const EventsFilterPage: React.FC<EventsFilterPageParams> = (
  props: EventsFilterPageParams
) => {
  //   if (!filteredEvents) {
  //     return <p className="center">Loading...</p>;
  //   }

  //   const year = filteredEvents[0];
  //   const month = filteredEvents[1];

  //   const yearNum = +year;
  //   const monthNum = +month;

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">
            Invalid filter... Please adjust search values
          </p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const searchResults = props.events;

  if (!searchResults || searchResults.length == 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">No events found...</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={searchResults} />
    </Fragment>
  );
};

export const getServerSideProps = async (context: any) => {
  const filteredEvents = context.params.slug;

  const year = filteredEvents[0];
  const month = filteredEvents[1];

  const yearNum = +year;
  const monthNum = +month;

  if (
    isNaN(yearNum) ||
    isNaN(monthNum) ||
    yearNum > 2030 ||
    yearNum < 2021 ||
    monthNum < 1 ||
    monthNum > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const searchResults = await getFilteredEvents({
    year: yearNum,
    month: monthNum,
  });

  return {
    props: {
      events: searchResults,
      date: {
        year: yearNum,
        month: monthNum,
      },
    },
  };
};

export default EventsFilterPage;
