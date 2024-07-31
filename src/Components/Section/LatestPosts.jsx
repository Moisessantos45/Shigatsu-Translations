import { useEffect, useState } from "react";
import PostCard from "../UI/PostCard";
import dbFirebase from "@/Config/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { fromToJsonMapPost } from "@/Services/useServices";

const LatestPosts = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const name_collection = import.meta.env.VITE_COLLECTION_LATESTPOSTS;

  const solicitud = async () => {
    try {
      const collectionPost = collection(dbFirebase, name_collection);
      const postSnapshot = await getDocs(collectionPost);
      const postList = postSnapshot.docs.map((doc) => doc.data());
      const fromToJson = postList.map(fromToJsonMapPost);
      setPost(fromToJson);
    } catch (error) {
      setPost([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    solicitud();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className=" p-4 md:p-8 lg:w-11/12 w-12/12 margin">
      <h1 className="text-3xl font-bold text-white mb-6">Latest Posts</h1>
      <div className="lg:grid lg:grid-cols-4 gap-4 flex flex-col">
        {post.map((post, i) => (
          <PostCard
            key={i}
            image={post.bg}
            title={post.namePost}
            date={post.createdAt}
            numberPost={post.numberPost}
            novelId={post.novelId}
            nombreNovela={post.nombreNovela}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
