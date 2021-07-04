import { regex } from '../../../helpers/emailRegEx';
import { isValidInput } from '../../../helpers/isValidInput';

const handler = (req, res) => {
    const eventId = req.query.eventId;

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        const match = regex.test(email);
        const validName = isValidInput(name);
        const validText = isValidInput(text);

        if (!match || !validName || !validText) {
            res.status(422).json({ message: 'Invalid Input' });
            return;
        }

        const newComment = {
            eventId,
            email,
            name,
            text,
        };

        fetch(
            'https://nextjs-course-25052-default-rtdb.firebaseio.com/comments.json',
            {
                method: 'POST',
                body: JSON.stringify(newComment),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                res.status(200).json({
                    message: 'Added Comment',
                    data: { id: data.name, ...newComment },
                });
            })
            .catch((error) => {
                res.status(422).json({
                    message: 'Something went wrong...',
                    error,
                });
            });
    }

    if (req.method === 'GET') {
        const comments = [];

        fetch(
            'https://nextjs-course-25052-default-rtdb.firebaseio.com/comments.json'
        )
            .then((res) => res.json())
            .then((data) => {
                for (const key in data) {
                    if (data[key].eventId === eventId) {
                        comments.push({
                            id: key,
                            email: data[key].email,
                            name: data[key].name,
                            text: data[key].text,
                            eventId: data[key].eventId,
                        });
                    }
                }

                res.status(200).json({
                    message: 'Comments Received',
                    data: comments,
                });
            })
            .catch((error) =>
                res
                    .status(500)
                    .json({ message: 'Something went wrong..', error })
            );
    }
};

export default handler;
