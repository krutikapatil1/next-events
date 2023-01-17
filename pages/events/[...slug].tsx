import { Fragment, useEffect, useState } from "react";
import ErrorAlert from "../../components/event-detail/error-alert";
import ResultsTitle from "../../components/event-detail/results-title";
import EventList from "../../components/event-list";
import Button from "../../components/ui/button";
import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";

interface EventsFilterPageParams {
  events: any;
  date: any;
}

const EventsFilterPage: React.FC<EventsFilterPageParams> = (
  props: EventsFilterPageParams
) => {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState<any[]>([]);
  const filteredEvents = router.query.slug;

  console.log(filteredEvents);

  const fetcher = async (url: string) =>
    fetch(url).then((response) => response.json());
  const { data, error } = useSWR(
    "https://next-events-fbfe7-default-rtdb.firebaseio.com/events.json",
    fetcher
  );
  useEffect(() => {
    if (data) {
      const transformedEvents = [];
      for (const key in data) {
        transformedEvents.push({
          ...data[key],
          id: key,
        });
      }
      if (transformedEvents.length > 0) {
        setLoadedEvents(transformedEvents);
      }
    }
  }, [data]);

  if (loadedEvents.length === 0) {
    return <p className="center">Loading...</p>;
  }

  let filteredSearchEvents = [];
  let date = new Date();

  if (filteredEvents) {
    const year = filteredEvents[0];
    const month = filteredEvents[1];

    const yearNum = +year;
    const monthNum = +month;

    if (
      isNaN(yearNum) ||
      isNaN(
        monthNum ||
          yearNum < 2021 ||
          yearNum > 2030 ||
          monthNum < 1 ||
          monthNum > 12 ||
          error
      )
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

    filteredSearchEvents = loadedEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === yearNum &&
        eventDate.getMonth() === monthNum - 1
      );
    });
    if (!filteredSearchEvents || filteredSearchEvents.length == 0) {
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
    date = new Date(yearNum, monthNum - 1);
  }
  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta name="description" content={`All events from `} />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredSearchEvents} />
    </Fragment>
  );
};

// export const getServerSideProps = async (context: any) => {
//   const filteredEvents = context.params.slug;

//   const year = filteredEvents[0];
//   const month = filteredEvents[1];

//   const yearNum = +year;
//   const monthNum = +month;

//   if (
//     isNaN(yearNum) ||
//     isNaN(monthNum) ||
//     yearNum > 2030 ||
//     yearNum < 2021 ||
//     monthNum < 1 ||
//     monthNum > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }

//   const searchResults = await getFilteredEvents({
//     year: yearNum,
//     month: monthNum,
//   });

//   return {
//     props: {
//       events: searchResults,
//       date: {
//         year: yearNum,
//         month: monthNum,
//       },
//     },
//   };
// };

export default EventsFilterPage;
