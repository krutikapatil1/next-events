import { useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

interface CommentsProps {
  eventId: string;
}

const Comments: React.FC<CommentsProps> = (props: CommentsProps) => {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: any) {
    console.log(commentData);
    fetch(`/api/comments/add/${eventId}`, {
      method: "POST",
      body: JSON.stringify({
        email: commentData.email,
        name: commentData.name,
        comment: commentData.text,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    // send data to API
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
};

export default Comments;
