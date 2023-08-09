import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './components/Layout';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import BlogPost from './pages/BlogPost';
import EditPost from './pages/EditPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
