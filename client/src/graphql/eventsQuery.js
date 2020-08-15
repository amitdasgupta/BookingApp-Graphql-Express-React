import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      _id
      title
      description
      price
      date
      creator {
        email
      }
    }
  }
`;

export const BOOK_EVENT = gql`
  mutation BookEvent($eventId: ID!) {
    bookEvent(eventId: $eventId) {
      _id
      event {
        _id
      }
    }
  }
`;

export const CREATE_EVENT_FORM = gql`
  mutation CreateEvent($eventInput: EventInput!) {
    createEvent(eventInput: $eventInput) {
      _id
      title
      description
      price
      date
      creator {
        email
      }
    }
  }
`;
