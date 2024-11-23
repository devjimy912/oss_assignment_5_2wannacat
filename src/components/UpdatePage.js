import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', age: '', occupation: '' });
  const [changeCount, setChangeCount] = useState(0);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts/${id}`);
          const data = await response.json();
          setFormData(data);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setChangeCount((prev) => prev + 1);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('Name is required!');
      nameRef.current.focus();
      return;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts/${id}`
      : 'https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Saved:', data);
      navigate('/list');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Post' : 'Add Post'}</h1>
      <p>Changes Made: {changeCount}</p>
      <label>
        Name:
        <input ref={nameRef} name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Age:
        <input name="age" type="number" value={formData.age} onChange={handleChange} />
      </label>
      <br />
      <label>
        Occupation:
        <input name="occupation" value={formData.occupation} onChange={handleChange} />
      </label>
      <br />
      <button onClick={handleSave}>{id ? 'Update' : 'Create'}</button>
    </div>
  );
};

export default UpdatePage;
