import { useState } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    function registrationHandler(event) {
        event.preventDefault();

        // fetch user input (state or refs)
        // send valid data to API
        fetch('/api/newsletter-signup', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Invalid Email') {
                    setError(data.message);
                    return;
                }
                setError(null);
            })
            .catch((err) => {
                console.error('Newsletter Registration', err);
                setError('Something went wrong...');
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
            {error && <p className={classes.error}>{error}</p>}
        </section>
    );
}

export default NewsletterRegistration;
