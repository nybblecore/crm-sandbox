const { Error } = require('sq-core/server');

module.exports = {
  ...Error,
  bookingnotallowed: function () {
    return {
      code: 400,
      message: 'Booking not allowed',
      key: 'BOOKING_NOT_ALLOWED'
    };
  },
  bookingexists: function () {
    return {
      code: 400,
      message: 'Booking exists',
      key: 'BOOKING_EXISTS'
    };
  },
  nohotelseatavailable: function () {
    return {
      code: 400,
      message: 'No hotel seat is avaiable',
      key: 'NO_HOTEL_SEAT'
    };
  },
  pastbookingnotallowed: function () {
    return {
      code: 400,
      message: 'Past booking not allowed',
      key: 'PAST_BOOKING_NOT_ALLOWED'
    };
  },
  invalidseat: function () {
    return {
      code: 400,
      message: 'Invalid seat number',
      key: 'INVALID_SEAT_NUMBER'
    };
  },
  invaliduser: function () {
    return {
      code: 400,
      message: 'Invalid user name',
      key: 'INVALID_USER_NAME'
    };
  },
  usernotallowedtobook: function () {
    return {
      code: 400,
      message: 'User is not allowed to book seat',
      key: 'USER_NOT_ALLOWED_TO_BOOK'
    };
  },
  pastcancellallowed: function () {
    return {
      code: 400,
      message: 'Past cancel not allowed',
      key: 'PAST_CANCEL_NOT_ALLOWED'
    };
  },
  seatbookinglimitexceeded: function (type, config) {
    return {
      code: 400,
      message: `Only ${config.total} ${type} bookings allowed per week`,
      key: 'BOOKING_LIMIT_EXCEEDED'
    };
  }
};
