import { useState, useEffect, useCallback } from 'react';
import classes from './comment-list.module.css';

function CommentList(props) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleNewComment = useCallback(() => {
        if (props.eventId === props.newComment.eventId) {
            setComments([props.newComment, ...comments]);
        }
    }, [props.newComment]);

    useEffect(() => {
        handleNewComment();
    }, [props.newComment]);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/comments/${props.eventId}`)
            .then((res) => res.json())
            .then((data) => {
                setComments(data.data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleComments = () => {
        if (loading) {
            return <p>Loading...</p>;
        }

        if (!!comments.length) {
            return comments.map((comment) => {
                return (
                    <li key={comment._id}>
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
