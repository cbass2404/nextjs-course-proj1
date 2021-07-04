import { regex } from '../../../helpers/emailRegEx';
import { keys } from '../../../config/keys';
import { connectDatabase, insertDocument } from '../../../helpers/db-util';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;

        const match = regex.test(email);

        if (!match) {
            res.status(422).json({ message: 'Invalid Email' });
            return;
        }

        let client;

        try {
            client = await connectDatabase(keys.MONGO_URI_NEWSLETTER);
        } catch (error) {
            res.status(500).json({
                message: 'Connecting to the database failed!',
            });
            return;
        }

        try {
            await insertDocument(client, 'newsletter', { email });
            client.close();
        } catch (error) {
            res.status(500).json({ message: 'Inserting data failed!' });
            return;
        }

        res.status(201).json({ message: 'Thanks for signing up!' });
    }
};
export default handler;
