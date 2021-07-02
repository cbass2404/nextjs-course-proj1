import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../helpers/api-util';
import EventsSearch from '../../components/events/EventsSearch';
import EventList from '../../components/events/EventList';

const AllEventsPage = ({ events }) => {
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

export const getStaticProps = async () => {
    const events = await getAllEvents();

    return {
        props: {
            events,
        },
        revalidate: 60,
    };
};

export default AllEventsPage;
