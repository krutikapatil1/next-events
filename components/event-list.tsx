import EventDetail from "./event-detail";

interface EventListProps {
  items: any;
}

const EventList: React.FC<EventListProps> = (props: EventListProps) => {
  const { items } = props;
  return (
    <ul>
      {items.map((event: any) => (
        <EventDetail
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
          key={event.id}
        />
      ))}
    </ul>
  );
};

export default EventList;
