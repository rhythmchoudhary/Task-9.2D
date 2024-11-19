import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { db, storage } from '../utils/firebase';
import '../styles/Post.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

function Post() {
  const [postType, setPostType] = useState('question');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [abstract, setAbstract] = useState('');
  const [code, setCode] = useState('');
  const [image, setImage] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPosting(true);

    let imageUrl = '';
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      await uploadTask;
      imageUrl = await getDownloadURL(storageRef);
    }

    try {
      await addDoc(collection(db, 'posts'), {
  postType,
  title,
  description,
  tags,
  abstract,
  code, // Code saved as a text field
  imageUrl,
  createdAt: new Date(),
});
      alert('Post submitted!');
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setIsPosting(false);
      setTitle('');
      setDescription('');
      setTags('');
      setAbstract('');
      setCode('');
      setImage(null);
    }
  };

  return (
    <div className="App">
      <div className="post-container">
        <h1>Create a New Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="post-type">
            <label>Select Post Type: </label>
            <div className="post-type-options">
              <label>
                <input
                  type="radio"
                  value="question"
                  checked={postType === 'question'}
                  onChange={() => setPostType('question')}
                />
                Question
              </label>
              <label>
                <input
                  type="radio"
                  value="article"
                  checked={postType === 'article'}
                  onChange={() => setPostType('article')}
                />
                Article
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {postType === 'article' && (
            <>
              <div className="form-group">
                <label>Abstract</label>
                <textarea
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image Upload</label>
                <input type="file" onChange={handleImageUpload} />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {postType === 'question' && (
            <div className="form-group">
              <label>Code</label>
              <CodeMirror
                value={code}
                options={{
                  mode: 'javascript',
                  theme: 'material',
                  lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => {
                  setCode(value);
                }}
              />
            </div>
          )}

          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isPosting}>
            {isPosting ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
