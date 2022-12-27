import classes from "./event-content.module.css";

interface EventContentProps {
  children: any;
}

const EventContent: React.FC<EventContentProps> = (
  props: EventContentProps
) => {
  return <section className={classes.content}>{props.children}</section>;
};

export default EventContent;
