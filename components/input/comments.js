import { useState, useContext } from 'react';
import NotificationContext from '../../store/notification-context';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
    const { eventId } = props;

    const notificationCtx = useContext(NotificationContext);

    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        notificationCtx.showNotification({
            title: 'Posting Comment',
            message: 'Sending to the input monkey',
            status: 'pending',
        });

        fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            body: JSON.stringify({ ...commentData }),
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
                setNewComment(data.data);
                notificationCtx.showNotification({
                    title: 'Success!',
                    message: data.message,
                    status: 'success',
                });
            })
            .catch((error) => {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: error.message || 'Something went wrong!',
                    status: 'error',
                });
            });
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && (
                <CommentList eventId={eventId} newComment={newComment} />
            )}
        </section>
    );
}

export default Comments;
