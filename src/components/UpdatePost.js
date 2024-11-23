import React, { useState, useEffect } from 'react';

function UpdatePost({ postId, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    occupation: '',
  });

  useEffect(() => {
    // Fetch the existing post data for the edit
    const fetchPost = async () => {
      const response = await fetch(`https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts/${postId}`);
      const post = await response.json();
      setFormData(post);
    };
    fetchPost();
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdatePost = async () => {
    try {
      const response = await fetch(`https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Post updated successfully!');
      onClose(); // Close the update form after saving
    } catch (error) {
      console.error('Error updating post:', error.message);
    }
  };

  return (
    <div>
      <h1>Update Post</h1>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Age:
        <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Occupation:
        <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={handleUpdatePost}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default UpdatePost;
