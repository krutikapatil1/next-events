import { useRouter } from "next/router";

const EventsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>This is the Events Detail Page for {id}</h1>
    </div>
  );
};

export default EventsDetailPage;
