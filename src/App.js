import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
// import './App.css';

function App() {
  const file_name = 'test.md';
  const [post, setPost] = useState('');

  useEffect(() => {
    import(`./markdown/${file_name}`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setPost(res))
      })
      .catch(err => console.log(err));
  });

  return (
    <Markdown>
      {post}
    </Markdown>
  );
}

export default App;