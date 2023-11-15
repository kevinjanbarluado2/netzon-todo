// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import TodoList from './TodoList';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import NavBar from './Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <div className='container-fluid min-vh-100 d-flex flex-column'>
        <NavBar />
        <div className="row justify-content-center align-items-center p-3 mt-3">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/tos" element={<TermsOfService />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
