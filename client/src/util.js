import moment from 'moment';

export const formatBookingDate = (d) => {
    return moment(d).format("ddd MMM Do");
};