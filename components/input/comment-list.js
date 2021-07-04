import { useState, useEffect } from 'react';
import classes from './comment-list.module.css';

function CommentList(props) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`/api/comments/${props.eventId}`)
            .then((res) => res.json())
            .then((data) => setComments(data.data))
            .catch((error) => console.error(error));
    }, []);

    const handleComments = () => {
        if (!!comments.length) {
            return comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <p>{comment.text}</p>
                        <div>
                            By <address>{comment.name}</address>
                        </div>
                    </li>
                );
            });
        } else {
            return (
                <li>
                    <p>No comments yet...</p>
                </li>
            );
        }
    };

    return <ul className={classes.comments}>{handleComments()}</ul>;
}

export default CommentList;
