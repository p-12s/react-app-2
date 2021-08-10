import React, {useState} from 'react';
import PostList from './components/PostList';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: "This is title", body: "This is body body body"},
    {id: 2, title: "This is title 2", body: "This is body body body 2"},
    {id: 3, title: "This is title 3", body: "This is body body body 3"},
    {id: 4, title: "This is title 4", body: "This is body body body 4"},
  ])

  return (
    <div className="App">
      <PostList posts={posts} title="This is new titlE"/>
    </div>
  );
}

export default App;
