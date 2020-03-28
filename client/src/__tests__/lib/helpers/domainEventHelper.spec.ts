import { getEventName } from '@/lib/helpers/domainEventHelper';
import { EventMessage } from '@/types/data';
import domainEvents from '@/constants/domainEvents';

describe('domainEventHelper tests', () => {
  // domainEventHelper tests
  it('getEventName should return a domain event name when passed an event message', async () => {
    const mockEventMessage: EventMessage = {
      id: 'some-event-message-id',
      type: 'event',
      timestamp: 'some-timestamp',
      payload_type: 'Some.Long.Directory.StudentsImported',
      payload: {},
      meta_data: []
    };

    const eventName = getEventName(mockEventMessage);
    expect(eventName).toEqual(domainEvents.STUDENTS_IMPORTED);
  });
});
