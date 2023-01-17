import classes from "./comment-list.module.css";
import { useEffect, useState } from "react";

interface CommentListProps {
  comments: any[];
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
}: CommentListProps) => {
  return (
    <ul className={classes.comments}>
      {Array.isArray(comments) &&
        comments.map((comment: any) => (
          <li key={comment._id}>
            <p>{comment.comment}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default CommentList;
