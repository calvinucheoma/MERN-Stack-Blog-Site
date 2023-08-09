import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createNewPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files?.[0]);

    console.log(files[0]);

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/post`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    setLoading(false);

    if (response.ok) {
      navigate('/');
    }

    // const responseData = await response.json();
    // console.log(responseData);
  };

  return (
    <>
      <form onSubmit={createNewPost}>
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(newValue) => setContent(newValue)}
          modules={modules}
          formats={formats}
        />
        <button disabled={loading} style={{ marginTop: '5px' }} type="submit">
          Create Post
        </button>
      </form>
    </>
  );
};

export default CreatePost;
