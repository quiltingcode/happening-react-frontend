
const DateFormatter = (props) => {

    const {event_date} = props

    const date = new Date(event_date);
    return new Intl.DateTimeFormat(
        'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    }).format(date);
    };
    

export default DateFormatter