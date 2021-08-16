import React from "react";

import Link from "next/link";

import CreateComment from "./createComment";
import CommentsList from "./commentsList";
import EditPost from "./editPost";

const PostsList = ({ posts, comments, currentUser }) => {
  return (
    <div>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <div className="user-avatar"></div>
            <div className="user-data">
              <Link href="/profiles/[userId]" as={`/profiles/${post.userId}`}>
                {post.email}
              </Link>
            </div>
            <div className="admin-buttons">
                <button className="admin-edit-post">Edit post</button>
                <button className="admin-delete-post">Delete post</button>
                <button className="admin-ban-user">Ban user</button>
              </div>
              
            {currentUser.email == post.email && <EditPost postId={post.id} />}
            <div id="post-content" className="post">
              {post.message}
            </div>
            <div>
              <CommentsList postId={post.id} comments={comments} />
              <CreateComment postId={post.id} comments={comments} />
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default PostsList;
