import React, {useState, useMemo} from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: "This is title", body: "This is body body body"},
  ])

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSearchedPost = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])

  // функции обратного вызова - их будут вызывать компоненты, т.к. напрямую у них доступа к изменению объекта нет
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false);
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
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
