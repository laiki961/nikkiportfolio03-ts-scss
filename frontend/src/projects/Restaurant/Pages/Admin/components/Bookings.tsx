import { AuthState } from "@okta/okta-auth-js";
import { ReactElement, useEffect } from "react";
import Loading from "../../../../../components/Loading/Loading";
import {
  fetchBookings,
  ReservationInfo,
} from "../../../Store/reservationSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/store";

type PropsType = {
  authState: AuthState | null;
};

const Bookings: React.FC<PropsType> = () => {
  const { bookings, status, error } = useAppSelector(
    (state) => state.reservation
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  let content: ReactElement | ReactElement[] = <Loading />;

  if (status === "loading") {
    content = (
      <div className='container min-vh-100'>
        <Loading />
      </div>
    );
  }

  if (error) {
    content = <div className='container min-vh-100 error-message'>{error}</div>;
  }

  console.log(bookings);
  if (bookings?.length) {
    content = bookings.map((booking: ReservationInfo) => {
      return (
        <div className='card' key={booking.id}>
          <div>
            <span>Name: </span>
            {booking.name}
          </div>
          <div>
            <span>Date: </span>
            {booking.dateTime.toLocaleDateString("en-GB", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div>
            <span>Time: </span>
            {booking.dateTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div>
            <span>Contact: </span>
            {booking.contact}
          </div>
          <div>
            <span>Email: </span>
            {booking.email}
          </div>
        </div>
      );
    });
  }

  return (
    <section className='restaurant-admin bookings'>
      <div className='restaurant-admin__header'>
        {/* <div className="restaurant-admin___feature">Filter</div> */}
        {/* <div className="restaurant-admin___feature">Sort</div> */}
      </div>
      <div className='bookings-cards'>{content}</div>
    </section>
  );
};

export default Bookings;
