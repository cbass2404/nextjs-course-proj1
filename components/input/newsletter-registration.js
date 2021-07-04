import { useState } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
    const [email, setEmail] = useState('');

    const [response, setResponse] = useState('');
    const [resStatus, setResStatus] = useState(null);

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
                console.log(data);
                if (data.message !== 'Thanks for signing up!') {
                    setResStatus('error');
                    setResponse(data.message);
                    return;
                }

                setResStatus('success');
                setResponse(data.message);
                setEmail('');
            })
            .catch((err) => {
                console.error('Newsletter Registration', err);
                setResStatus('error');
                setResponse('Something went wrong...');
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
            {resStatus && (
                <p
                    className={
                        resStatus === 'success'
                            ? classes.success
                            : classes.error
                    }
                >
                    {response}
                </p>
            )}
        </section>
    );
}

export default NewsletterRegistration;
