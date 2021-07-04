import { useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            body: JSON.stringify({ ...commentData }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => setNewComment(data.data))
            .catch((error) => console.error(error));
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
