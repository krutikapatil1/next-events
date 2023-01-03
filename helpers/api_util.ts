export const getEvents = async () => {
  try {
    console.log("Calling get events....");
    const response = await fetch(
      "https://next-events-fbfe7-default-rtdb.firebaseio.com/events.json"
    );
    if (response && response.ok) {
      const data = await response.json();
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      return events;
    } else {
      console.error("received error response for the fetch call");
      return null;
    }
  } catch (ex) {
    console.error("Error while fetching events");
    return null;
  }
};

export const getFeaturedEvents = async () => {
  const events = await getEvents();
  const featuredEvents = events?.filter((event) => event.isFeatured);
  return featuredEvents;
};

export const getEventById = async (id: string) => {
  const events = await getEvents();
  const event = events?.find((event) => event.id === id);
  return event;
};
