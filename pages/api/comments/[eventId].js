import { MongoClient } from 'mongodb';
import { keys } from '../../../config/keys';
import { regex } from '../../../helpers/emailRegEx';
import { isValidInput } from '../../../helpers/isValidInput';

const handler = async (req, res) => {
    const eventId = req.query.eventId;

    const client = await MongoClient.connect(keys.MONGO_URI_EVENTS);

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

        const db = client.db();

        const result = await db.collection('comments').insertOne(newComment);

        newComment.id = result.insertedId;

        res.status(201).json({ message: 'Added Comment', data: newComment });
    }

    if (req.method === 'GET') {
        const db = client.db();

        const result = await db
            .collection('comments')
            .find({ eventId })
            .sort({ _id: -1 })
            .toArray();

        res.status(200).json({ data: result });
    }

    client.close();
};

export default handler;
