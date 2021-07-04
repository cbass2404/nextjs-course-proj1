import { regex } from '../../../helpers/emailRegEx';
import { MongoClient } from 'mongodb';
import { keys } from '../../../config/keys';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;

        const match = regex.test(email);

        if (!match) {
            res.status(422).json({ message: 'Invalid Email' });
            return;
        }

        const client = await MongoClient.connect(keys.MONGO_URI_NEWSLETTER);

        const db = client.db();

        const response = await db.collection('emails').insertOne({ email });

        client.close();

        res.status(201).json({ message: 'Signed Up' });
    }
};
export default handler;
