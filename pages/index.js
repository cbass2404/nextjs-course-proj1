import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = ({ featuredEvents }) => {
    return (
        <div>
            <EventList events={featuredEvents} />
        </div>
    );
};

export const getStaticProps = async () => {
    const featuredEvents = await getFeaturedEvents();

    return { props: { featuredEvents }, revalidate: 60 * 30 };
};

export default HomePage;
