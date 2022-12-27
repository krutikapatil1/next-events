import classes from "./event-summary.module.css";

interface EventSummaryProps {
  title: string;
}

const EventSummary: React.FC<EventSummaryProps> = (
  props: EventSummaryProps
) => {
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default EventSummary;
