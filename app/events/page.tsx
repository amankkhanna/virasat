import { getEventsByDay } from '@/lib/events';
import EventsList from './EventsList';

export default async function AllEventsPage() {
  const initialData = await getEventsByDay(1, 2, {});

  return (
    <EventsList
      initialEventsByDay={initialData.eventsByDay}
      initialTotalPages={initialData.totalPages}
      initialHasMore={initialData.hasMore}
      initialTotalCount={initialData.totalCount}
    />
  );
}
