import React from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";
import cx from "classnames";
import style from "../../stylesheets/components/event.module.scss";
import { BOOK_EVENT } from "../../graphql/eventsQuery";
import { GET_BOOKING } from "../../graphql/bookingsQuery";

export default function Event(props) {
  const {
    event: {
      _id,
      date,
      description,
      price,
      title,
      creator: { email } = {},
    } = {},
    isPurchased,
  } = props;

  const [
    bookEvent,
    { error: { message: graphqlError } = {}, loading },
  ] = useMutation(BOOK_EVENT);
  const handleBooking = async () => {
    try {
      await bookEvent({
        variables: {
          eventId: _id,
        },
        update: (cache, { data: { bookEvent } }) => {
          const bookedItems = cache.readQuery({ query: GET_BOOKING });
          cache.writeQuery({
            query: GET_BOOKING,
            data: {
              getBookedEvents: [
                ...bookedItems.getBookedEvents,
                { _id: bookEvent.event._id, bookingId: bookEvent._id },
              ],
            },
          });
        },
      });
    } catch (error) {}
  };

  const _buttonClassName = cx(style.bookButton, {
    [style.isPurchased]: isPurchased,
  });
  return (
    <div className={style.main}>
      {(loading && <div>Loading ....</div>) || (
        <>
          <div className={style.title}>{title}</div>
          <div className={style.description}>{description}</div>
          <div className={style.details}>
            <div>{moment(date).format("MMM Do YY")}</div>
            <div className={style.price}>₹{price}</div>
            <div onClick={handleBooking} className={_buttonClassName}>
              {(isPurchased && "Booked!") || "Book Event"}
            </div>
          </div>
          <div className={style.author}>Author: {email}</div>
          {graphqlError && <p className="error">{graphqlError}</p>}
        </>
      )}
    </div>
  );
}
