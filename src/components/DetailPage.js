import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.name}</h1>
      <p>Age: {post.age}</p>
      <p>Email: {post.email}</p>
      <p>Occupation: {post.occupation}</p>
    </div>
  );
};

export default DetailPage;
