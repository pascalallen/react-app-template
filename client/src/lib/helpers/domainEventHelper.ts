import { EventMessage } from '@/types/data';

export const getEventName = (eventMessage: EventMessage) => {
  return eventMessage.payload_type.split('.').pop();
};
