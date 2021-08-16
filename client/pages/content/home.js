import React from "react";

import CreatePost from "../../components/posts/createPost";
import PostsList from "../../components/posts/postsList";
import GroupsList from "../../components/groups/groupList";
import Link from "next/link";
const Home = ({ posts, currentUser, comments, groups }) => {
  return (
    <body>
      <div className="content-home">
        <div className="item-1">
          <CreatePost currentUser={currentUser} />
        </div>
        <div className="item-2">Komunikator</div>
        <div className="item-3"></div>
        <div className="item-5">
          <PostsList
            posts={posts}
            currentUser={currentUser}
            comments={comments}
          />
        </div>
        <div className="item-6">
          <Link href="https://blog.dev/groups/overview">
            <button className="groups-button"> Groups </button>
          </Link>
          <GroupsList groups={groups}></GroupsList>
        </div>
      </div>
    </body>
  );
};

Home.getInitialProps = async (context, client, currentUser) => {
  const urls = ["/api/posts", `api/comments`, "api/groups"];

  const [postsRes, commentsRes, groupsRes] = await Promise.all(
    urls.map((url) => client.get(url))
  );

  console.log(postsRes.data);

  return {
    ...postsRes.data,
    ...commentsRes.data,
    ...groupsRes.data,
  };
};

export default Home;
