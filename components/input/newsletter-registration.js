import { useState, useContext } from 'react';
import NotificationContext from '../../store/notification-context';

import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
    const notificationCtx = useContext(NotificationContext);
    const [email, setEmail] = useState('');

    function registrationHandler(event) {
        event.preventDefault();

        notificationCtx.showNotification({
            title: 'Signing Up',
            message: 'Registering for newsletter.',
            status: 'pending',
        });

        // fetch user input (state or refs)
        // send valid data to API
        fetch('/api/newsletter-signup', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return res.json().then((data) => {
                    throw new Error(data.message || 'Something went wrong!');
                });
            })
            .then((data) => {
                notificationCtx.showNotification({
                    title: 'Success!',
                    message: data.message,
                    status: 'success',
                });
                setEmail('');
            })
            .catch((err) => {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: err.message || 'Something went wrong!',
                    status: 'error',
                });
            });
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        aria-label="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;
