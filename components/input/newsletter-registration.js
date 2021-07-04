import { useState } from 'react';
import classes from './newsletter-registration.module.css';
import { regex as re } from '../../helpers/emailRegEx';

function NewsletterRegistration() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    function registrationHandler(event) {
        event.preventDefault();

        const match = re.test(email);

        // optional: validate input
        if (!match) {
            setError('Invalid Email');
            return;
        }

        setError(null);

        // fetch user input (state or refs)
        // send valid data to API
        fetch('/api/newsletter-signup', {
            method: 'POST',
            body: email,
        })
            .then((res) => console.log(res))
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
