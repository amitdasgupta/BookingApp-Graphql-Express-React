import React from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";
import cx from "classnames";
import style from "../../stylesheets/components/event.module.scss";
import { CANCEL_BOOKING, GET_BOOKING } from "../../graphql/bookingsQuery";

export default function UnbookEvent(props) {
  const {
    event: { date, description, price, title, creator: { email } = {} } = {},
    bookingId,
  } = props;
  const [
    cancelBooking,
    { error: { message: graphqlError } = {}, loading },
  ] = useMutation(CANCEL_BOOKING);
  const handleBooking = async () => {
    try {
      await cancelBooking({
        variables: {
          bookingId: bookingId,
        },
        update: (cache, { data: { cancelBooking } }) => {
          const bookedItems = cache.readQuery({ query: GET_BOOKING });
          const bookedItemsNew = bookedItems.getBookedEvents.filter(
            (booking) => booking._id !== cancelBooking._id
          );
          cache.writeQuery({
            query: GET_BOOKING,
            data: { getBookedEvents: [...bookedItemsNew] },
          });
        },
      });
    } catch (error) {}
  };

  const _buttonClassName = cx(style.bookButton);

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
              Cancel Booking!
            </div>
          </div>
          <div className={style.author}>Author: {email}</div>
          {graphqlError && <p className="error">{graphqlError}</p>}
        </>
      )}
    </div>
  );
}
