import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList from './ShowList';
import AddNewPost from './AddNewPost';
import UpdatePost from './UpdatePost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/add-post" element={<AddNewPost />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
