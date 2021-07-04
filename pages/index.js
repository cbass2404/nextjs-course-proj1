import Head from 'next/head';

import EventList from '../components/events/EventList';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = ({ featuredEvents }) => {
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta
                    name="description"
                    content="Find a lot of great events to help you progress as a developer"
                />
            </Head>
            <NewsletterRegistration />
            <EventList events={featuredEvents} />
        </div>
    );
};

export const getStaticProps = async () => {
    const featuredEvents = await getFeaturedEvents();

    return { props: { featuredEvents }, revalidate: 60 * 30 };
};

export default HomePage;
