# NextJS

[Documentation](https://nextjs.org/)

## What is NextJS?

-   The react framework for production
-   Used to build large scale react applications production ready
-   A full stack react framework
-   Solves common problems and makes building React apps easier!
-   Doesn't require as many third party libraries to make an app
-   You still write react code, components, props, state, context etc...
-   lots of built-in features (e.g. routing) that help you solve common problems & clear guidance on how to use those features

## Server Side Rendering

-   prepares the content on the page on the server instead of the client
-   helps search engine crawlers find content on your page to send to searchers
    -   on client side rendering search engine crawlers only see the html skeleton
-   better user experience because there is no flicker
-   automatic page pre-rendering
    -   great for SEO and inital load
-   blends client-side and server-side
    -   fetch data on the server and render finished pages

## KEY FEATURES

-   file-based routing
    -   define pages and routes with files and folders instead of code
    -   less code, less work, highly understandable
    -   lets you go back to a more basic html type routing
    -   supports dynamic routes, slugs etc...
-   fullstack framework
    -   easily add backend server-side code to your next/react apps
    -   stores data, getting data, authentication etc. can be added to your react projects
-   nextjs allows you to decide when to allow server side rendering

## Routing

How File-based Routing Works...

-   /pages

    -   index.js
        -   main starting page "/"
    -   about.js
        -   about page "/about"
    -   /products
        -   index.js
            -   all products page "/products"
        -   [id].js
            -   dynamic route for product detail page "/products/${id}"
        -   [...slug].js
            -   dynamic route for slug parameters

-   index.js files are used as the base file for the folder route

-   nextjs gives a special hook and HOC to give access to routing in a component
    -   useRouter from 'next/router'
        -   for functional components
    -   withRouter from 'next/router'
        -   HOC for class based components

```javascript
import { useRouter } from 'next/router';

const PortfolioProjectPage = () => {
    const router = useRouter();

    // query property gives access to complete data in the url
    // can be used to send a req to a backend server
    // to fetch the piece of data with an id of router.query.projectid
    console.log(router.query);

    return (
        <div>
            <h1>The Portfolio Project Page</h1>
        </div>
    );
};

export default PortfolioProjectPage;
```

### Slug files

```javascript
// filename [...slug].js
import { useRouter } from 'next/router';

const BlogPostsPage = () => {
    const router = useRouter();

    // returns an array of the slug parameter
    // {slug: ['2019', '12']}
    console.log(router.query);

    return (
        <div>
            <h1>The Blog Posts</h1>
        </div>
    );
};

export default BlogPostsPage;
```

### Links

Next has a native Link import from 'next/Link' to navigate within the app, just as with React 'a' tags are only used to navigate away from the application.

```javascript
import Link from 'next/Link';

const HomePage = () => {
    return (
        <div>
            <h1>The Home Page</h1>
            <ul>
                <li>
                    <Link href="/portfolio">Portfolio</Link>
                </li>
            </ul>
        </div>
    );
};

export default HomePage;
```

-   Link has many props to use and improve its basic functionality
    -   replace
        -   makes the routes component replace the current component
    -   href
        -   gives the route to navigate to
    -   lots more

### Dynamic routes

```javascript
import Link from 'next/Link';

const ClientsPage = () => {
    const clients = [
        { id: 'max', name: 'Maximilian' },
        { id: 'manu', name: 'Manuel' },
    ];

    return (
        <div>
            <h1>The Clients Page</h1>
            <ul>
                {clients.map(({ id, name }) => (
                    <li key={id}>
                        <Link
                            href={{
                                pathname: 'clients/[id]',
                                query: { id },
                            }}
                        >
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientsPage;
```

### Programatic Routes

-   This is done through making use of an onClick handler or something equivalent and using the router.push function as below

```javascript
import { useRouter } from 'next/router';

const ClientProjectsPage = () => {
    const router = useRouter();

    console.log(router.query);

    const handleLoadProject = () => {
        router.push({
            pathname: '/clients/[id]/[clientproject]',
            query: { id: 'max', clientproject: 'projecta' },
        });
    };

    return (
        <div>
            <h1>The Projects of a Given Client</h1>
            <button onClick={handleLoadProject}>Load Project A</button>
        </div>
    );
};

export default ClientProjectsPage;
```

### NoMatch route

-   Nextjs makes this easy
    -   in pages route directory create a file called 404.js and design the page accordingly

```javascript
// /pages/404.js
const NotFoundPage = () => {
    return (
        <div>
            <h1>Page not found :(</h1>
        </div>
    );
};

export default NotFoundPage;
```

## Styling with Modules

-   Next and react have a native styling method for css
    -   convention is to name the file ComponentName.module.css
        _EventItem.module.css_
-   Importing it as class or style in your component gives it component specific class names to style those components
-   Same class names in files will not have any effect on other components with the same class name
-   Styling links, you need to add a anchor tag inside the link tag to add a style to it
    _Note: Link tags inheritly add an anchor tag behind the scenes and controls how they work, do not add a href to the anchor tag_

## Icons

-   create an icons folder in components directory
-   import the icon like normal
-   styles can be applied to icons through div/span/etc... tags like normal

## Navigation Bar / \_app.js

-   in components directory create a layout folder
-   create a Layout.js file and MainHeader.js file

-   the Layout component will work as a HOC to pass the Navigation bar to each child component of that file

```javascript
import { Fragment } from 'react';
import MainHeader from './MainHeader';

const Layout = (props) => {
    return (
        <Fragment>
            <MainHeader />
            <main>{props.children}</main>
        </Fragment>
    );
};

export default Layout;
```

-   next create your navbar in your MainHeader.js file as below, customizing for how you need it

```javascript
import Link from 'next/Link';

import classes from './MainHeader.module.css';

const MainHeader = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href="/">NextEvents</Link>
            </div>
            <nav className={classes.navigation}>
                <ul>
                    <li>
                        <Link href="/events">Browse All Events</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;
```

-   finally, in your \_app.js file in the main pages directory, import your Layout.js and wrap your component with it, passing the navigation tool to each child component inside it

```javascript
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />;
        </Layout>
    );
}

export default MyApp;
```

## Filtering in NextJS using a [...slug].js component

-   create your search parameter component

```javascript
import { props } from 'ramda';
import { useRef } from 'react';

import Button from '../ui/Button';

import classes from './EventsSearch.module.css';

const EventsSearch = (props) => {
    const yearInputRef = useRef();
    const monthInputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedYear = yearInputRef.current.value;
        const selectedMonth = monthInputRef.current.value;

        props.onSearch(selectedYear, selectedMonth);
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label>
                        Year
                        <select id="year" ref={yearInputRef}>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                        </select>
                    </label>
                </div>
                <div className={classes.control}>
                    <label>
                        Month
                        <select id="month" ref={monthInputRef}>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </label>
                </div>
            </div>
            <Button>Find Events</Button>
        </form>
    );
};

export default EventsSearch;
```

-   import it into the proper spot in your pages folder
    _files that you only need the value of that one time can use the useRef hook as above instead of creating state_

```javascript
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
```

_the above example is using a programatic routing method to navigate to the parameters passed_

-   use the useRouter hook from next/router to get the parameters searched for in the slug component
    -   specifically use the query path to get the array of slug parameters
-   make sure your data types are right
-   pass in error checking functionality
-   query for the parameters
