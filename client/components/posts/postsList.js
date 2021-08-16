import React from "react";

import Link from "next/link";
import { useState } from "react";

import UseRequest from "../../hooks/use-request";

import CreateComment from "../comments/createComment";
import CommentsList from "../comments/commentsList";
import EditPost from "./editPost";

import DeletePost from "./deletePost";
import BanUser from '../groups/banUser'

const PostsList = ({ posts, comments, currentUser }) => {
  const [postId, setPostId] = useState("");

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
              <DeletePost postId={post.id} />
              <BanUser postId={post.id}/>
              {/* <button className="admin-ban-user">Ban user</button> */}
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
