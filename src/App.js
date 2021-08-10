import React, {useState, useMemo} from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/input/MyInput';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: "This is title", body: "This is body body body"},
  ])

  const [selectedSort, setSelectedSort] = useState('')
  const sortPost = (sort) => {
    setSelectedSort(sort)
  }

  const [searchQuery, setSearchQuery] = useState('')

  const sortedPosts = useMemo(() => {
    console.log('sort function runnnnnnned')
    if (selectedSort) {
      return [...posts].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts

  }, [selectedSort, posts])

  const sortedAndSearchedPost = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery))
  
  }, [searchQuery, sortedPosts])

  // функции обратного вызова - их будут вызывать компоненты, т.к. напрямую у них доступа к изменению объекта нет
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  

  

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <div>
        <MyInput 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search"
        />
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
      {sortedAndSearchedPost.length
        ? <PostList remove={removePost} posts={sortedAndSearchedPost} title="This is new titlE"/>
        : <h1 style={{textAligne: 'center'}}>Постов нет 😶‍🌫️😶‍🌫️😶‍🌫️</h1>
      }
    </div>
  );
}

export default App;
