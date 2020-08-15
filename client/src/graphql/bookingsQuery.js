import { gql } from "@apollo/client";

export const GET_BOOKING = gql`
  query GetBookedEvents {
    getBookedEvents {
      _id
      bookingId
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      title
      _id
    }
  }
`;
