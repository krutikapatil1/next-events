import { useRouter } from "next/router";

const EventsFilterPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>This is the Events Detail Page</h1>
      <p>Filtered queries are: {slug}</p>
    </div>
  );
};

export default EventsFilterPage;
