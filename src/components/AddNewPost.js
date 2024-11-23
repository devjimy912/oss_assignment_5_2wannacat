import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddNewPost() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    occupation: '',
  });

  const navigate = useNavigate();

  // 입력 필드 값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // 폼 유효성 검사 후 게시물 저장
  const handleSavePost = async () => {
    // 입력 값이 하나라도 비어있으면 저장하지 않음
    if (Object.values(formData).some((value) => value.trim() === '')) {
      alert('모든 필드를 입력하세요.');
      return;
    }

    try {
      const response = await fetch('https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      await response.json();
      navigate('/'); // 저장 후 리스트 페이지로 돌아가기
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  // 취소 버튼 클릭 시 이전 페이지로 돌아가기
  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div>
      <h2>Add New Post</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Occupation:
        <input
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button onClick={handleSavePost}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default AddNewPost;
