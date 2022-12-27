import EventListItem from "./event-list-item";
import classes from "./event-list.module.css";

interface EventListProps {
  items: any;
}

const EventList: React.FC<EventListProps> = (props: EventListProps) => {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((event: any) => (
        <EventListItem
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
