import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import { Ring } from 'react-awesome-spinners';

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

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');

  const [loading, setLoading] = useState(false);

  const [loadData, setLoadData] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/post/${id}`).then((response) =>
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setLoadData(false);
      })
    );
  }, [id]);

  const updatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/post/${id}`,
      {
        method: 'PUT',
        body: data,
        credentials: 'include',
      }
    );

    setLoading(false);

    if (response.ok) {
      navigate(`/post/${id}`);
    }
  };

  return (
    <>
      {loadData ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <Ring />
        </div>
      ) : (
        <form onSubmit={updatePost}>
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
            Edit Post
          </button>
        </form>
      )}
    </>
  );
};

export default EditPost;
