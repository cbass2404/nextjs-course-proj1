import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../dummy-data';
import EventsSearch from '../../components/events/EventsSearch';
import EventList from '../../components/events/EventList';

const AllEventsPage = () => {
    const events = getAllEvents();
    const router = useRouter();

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    };

    return (
        <Fragment>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList events={events} />
        </Fragment>
    );
};

export default AllEventsPage;
