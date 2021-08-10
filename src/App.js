import React, {useState} from 'react';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: "This is title", body: "This is body body body"},
    {id: 2, title: "This is title 2", body: "This is body body body 2"},
    {id: 3, title: "This is title 3", body: "This is body body body 3"},
    {id: 4, title: "This is title 4", body: "This is body body body 4"},
  ])

  const [post, setPost] = useState({title: '', body: ''})

  const addNewPost = (e) => {
    e.preventDefault();
    setPosts([...posts, {...post, id: Date.now()}])
    setPost({title: '', body: ''})
  }



  return (
    <div className="App">
      <PostList posts={posts} title="This is new titlE"/>
      <form>
        {/* управляемый компонент */}
        <MyInput value={post.title} onChange={e => setPost({...post, title: e.target.value})} type="text" placeholder="Title" />
        <MyInput value={post.body} onChange={e => setPost({...post, body: e.target.value})} type="text" placeholder="Description" />

        <MyButton onClick={addNewPost}>SeNd</MyButton>
      </form>
    </div>
  );
}

export default App;
