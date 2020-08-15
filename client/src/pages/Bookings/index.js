import React from "react";
import UnBookEvent from "../../components/UnbookEvent";
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
          let result = [];
          getBookedEvents.forEach((booked) => {
            if (booked._id === event._id)
              result.push(
                <UnBookEvent
                  event={event}
                  key={index}
                  bookingId={booked.bookingId}
                />
              );
          });
          return result;
        })}
    </div>
  );
};

export default Home;
