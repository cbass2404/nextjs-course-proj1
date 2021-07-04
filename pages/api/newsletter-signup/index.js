import { regex } from '../../../helpers/emailRegEx';

const handler = (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;

        const match = regex.test(email);

        // optional: validate input
        if (!match) {
            res.status(422).json({ message: 'Invalid Email' });
            return;
        }

        fetch(
            'https://nextjs-course-25052-default-rtdb.firebaseio.com/newsletter.json',
            {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                res.status(200).json({
                    message: 'Success',
                    data: {
                        id: data.name,
                        email,
                    },
                });
            })
            .catch((error) => {
                res.status(400).send({ message: 'Bad Request', error });
            });
    }
};
export default handler;
