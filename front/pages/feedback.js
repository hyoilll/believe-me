import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Feedback = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <>
      <Head>
        <title>BelieveMe | Feedback</title>
      </Head>
      <AppLayout headerTitle={"Feedback"}>
        {me && <PostForm></PostForm>}
        {mainPosts.map((post) => {
          return <PostCard key={post.id} post={post}></PostCard>;
        })}
      </AppLayout>
    </>
  );
};

export default Feedback;
