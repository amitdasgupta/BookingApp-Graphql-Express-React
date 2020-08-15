import React from "react";
import Event from "../../components/Event";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../graphql/eventsQuery";
import { GET_BOOKING } from "../../graphql/bookingsQuery";

const Home = (props) => {
  const { loading, error, data: { events } = {} } = useQuery(GET_EVENTS);
  const {
    loading: loadingBooked,
    data: { getBookedEvents = [] } = {},
  } = useQuery(GET_BOOKING);
  if (loading || loadingBooked) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div className="Home">
      {((loading || loadingBooked) && <div>Loading........</div>) ||
        events.map((event, index) => {
          const isPurchased = getBookedEvents.findIndex(
            (booked) => booked._id === event._id
          );
          return (
            <Event event={event} key={index} isPurchased={isPurchased !== -1} />
          );
        })}
    </div>
  );
};

export default Home;
