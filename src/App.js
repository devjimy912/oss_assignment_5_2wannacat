import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList from './components/ShowList';
import AddNewPost from './components/AddNewPost';
import UpdatePost from './components/UpdatePost';

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
