import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ShowList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleEditPost = (id) => {
    navigate(`/update-post/${id}`);
  };

  const handleAddPost = () => {
    navigate('/add-post');
  };

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={handleAddPost}>Add Post</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.name}</h2>
            <p>Age: {post.age}</p>
            <p>Email: {post.email}</p>
            <p>Occupation: {post.occupation}</p>
            <button onClick={() => handleEditPost(post.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowList;
