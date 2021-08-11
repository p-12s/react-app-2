import React, {useState} from 'react';
import {usePost} from './hooks/usePosts';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';
import './styles/App.css';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPost = usePost(posts, filter.sort, filter.query)
  
  // функции обратного вызова - их будут вызывать компоненты, т.к. напрямую у них доступа к изменению объекта нет
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false);
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  async function fetchPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(response.data)
  }
  return (
    <div className="App">
      <MyButton onClick={fetchPosts} style={{margin: '30px 0'}}>Get post</MyButton>
      <MyButton onClick={() => setModal(true)} style={{margin: '30px 0'}}>Create post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList remove={removePost} posts={sortedAndSearchedPost} title="This is new titlE"/>
    </div>
  );
}

export default App;
