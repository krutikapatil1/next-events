import { useRouter } from "next/router";
import { Fragment } from "react";
import ErrorAlert from "../../components/event-detail/error-alert";
import ResultsTitle from "../../components/event-detail/results-title";
import EventList from "../../components/event-list";
import Button from "../../components/ui/button";
import { getFilteredEvents } from "../../dummy-data";

const EventsFilterPage = () => {
  const router = useRouter();
  const filteredEvents = router.query.slug;

  if (!filteredEvents) {
    return <p className="center">Loading...</p>;
  }

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

  const searchResults = getFilteredEvents({
    year: yearNum,
    month: monthNum,
  });

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

  const date = new Date(yearNum, monthNum - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={searchResults} />
    </Fragment>
  );
};

export default EventsFilterPage;
