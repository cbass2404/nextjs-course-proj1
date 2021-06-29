import EventItem from './EventItem';
import classes from './EventList.module.css';

const EventList = ({ events }) => {
    return (
        <ul className={classes.list}>
            {events.map((event) => (
                <EventItem event={event} />
            ))}
        </ul>
    );
};

export default EventList;
