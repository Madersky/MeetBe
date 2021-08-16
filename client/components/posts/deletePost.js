import React, { useState } from "react";
import Router from "next/router";

import useRequest from "../../hooks/use-request";

const deletePost = ({ postId }) => {
  const [message, setMessage] = useState("");

  const { doRequest, errors } = useRequest({
    url: `/api/posts/id/${postId}`,
    method: "delete",

    onSuccess: () => {
      Router.reload();
      console.log("post updated");
    },
  });

  const onClick = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <div className="unknown name">
      <button className="delete-post-button" onClick={onClick}>Delete post</button>
      {errors}
    </div>
  );
};

export default deletePost;
