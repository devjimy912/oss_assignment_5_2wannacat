import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ShowList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      await fetch(`https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts/${id}`, {
        method: 'DELETE',
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <Link to="/add">
        <button>Add Post</button>
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.name}</h2>
            <p>Age: {post.age}</p>
            <p>Email: {post.email}</p>
            <p>Occupation: {post.occupation}</p>
            <Link to={`/edit/${post.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowList;
