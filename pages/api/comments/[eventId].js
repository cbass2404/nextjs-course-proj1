import { keys } from '../../../config/keys';
import {
    connectDatabase,
    insertDocument,
    getEventComments,
} from '../../../helpers/db-util';
import { regex } from '../../../helpers/emailRegEx';
import { isValidInput } from '../../../helpers/isValidInput';

const handler = async (req, res) => {
    const eventId = req.query.eventId;

    let client;

    try {
        client = await connectDatabase(keys.MONGO_URI_EVENTS);
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        const match = regex.test(email);
        const validName = isValidInput(name);
        const validText = isValidInput(text);

        if (!match || !validName || !validText) {
            res.status(422).json({ message: 'Invalid Input' });
            client.close();
            return;
        }

        const newComment = {
            eventId,
            email,
            name,
            text,
        };

        let result;

        try {
            result = await insertDocument(client, 'comments', newComment);
            newComment._id = result.insertedId;

            res.status(201).json({
                message: 'Added Comment',
                data: newComment,
            });
        } catch (error) {
            res.status(500).json({ message: 'Inserting comment failed!' });
        }
    }

    if (req.method === 'GET') {
        try {
            const result = await getEventComments(
                client,
                'comments',
                { eventId },
                { _id: -1 }
            );

            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ message: 'Getting comments failed' });
        }
    }

    client.close();
};

export default handler;
