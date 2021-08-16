import React, { useState } from "react";
import Router from "next/router";

import useRequest from "../../hooks/use-request";

const banUser = ({ postId }) => {
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
    <div>
      <button className="admin-ban-user" onClick={onClick}> Ban user</button>
      {errors}
    </div>
  );
};

export default banUser;
