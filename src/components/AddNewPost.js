import React, { useState } from 'react';

function AddNewPost() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    occupation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSavePost = async () => {
    try {
      const response = await fetch('https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newPost = await response.json();
      alert('Post added successfully!');
      // Optional: Redirect back to list page after successful post
    } catch (error) {
      console.error('Error adding post:', error.message);
    }
  };

  return (
    <div>
      <h1>Add a New Post</h1>
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
      <button onClick={handleSavePost}>Save</button>
    </div>
  );
}

export default AddNewPost;
