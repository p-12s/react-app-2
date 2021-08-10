import React, {useState} from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MySelect from './components/UI/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: "This is title", body: "This is body body body"},
  ])

  // функции обратного вызова - их будут вызывать компоненты, т.к. напрямую у них доступа к изменению объекта нет
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const [selectedSort, setSelectedSort] = useState('')
  const sortPost = (sort) => {
    setSelectedSort(sort)
    setPosts([...posts].sort((a,b) => a[sort].localeCompare(b[sort])))
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <div>
        <MySelect 
          defaultValue="Сортировка"
          option={[
            {value: 'title', name: 'по названию'},
            {value: 'body', name: 'по описанию'},
          ]}
          value={selectedSort}
          onChange={sortPost}
        />
      </div>
      {posts.length
        ? <PostList remove={removePost} posts={posts} title="This is new titlE"/>
        : <h1 style={{textAligne: 'center'}}>Постов нет 😶‍🌫️😶‍🌫️😶‍🌫️</h1>
      }
    </div>
  );
}

export default App;
