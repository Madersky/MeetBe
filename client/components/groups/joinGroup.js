import React, { useState } from "react";
import Router from "next/router";

import useRequest from "../../hooks/use-request";

const joinGroup = ({ groupId, currentUser }) => {
  const [message, setMessage] = useState("");

  const { doRequest, errors } = useRequest({
    url: `https://blog.dev/api/groups/${groupId}`,
    method: "patch",
    // body: {
    //     email: currentUser.email,
    //     userId: currentUser.id,
        
    // },

    onSuccess: () => {
    //   Router.reload();
      console.log("member updated");
    },
  });

  const onClick = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <div className="unknown name">
      <button className="join-group-button" onClick={onClick}>Join group</button>
      {errors}
    </div>
  );
};

export default joinGroup;
