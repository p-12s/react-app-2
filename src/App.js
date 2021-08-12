import React, {useState, useEffect} from 'react';
import {usePost} from './hooks/usePosts';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';
import MyLoader from './components/UI/loader/MyLoader';
import MyPagination from './components/UI/pagination/MyPagination';
import './styles/App.css';
import PostService from './API/PostService';
import { useFetching } from './hooks/useFetching';
import { getPageCount } from './utils/pages';

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPost = usePost(posts, filter.sort, filter.query)

  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page );
    setPosts(response.data)

    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit) )
  })

  // функции обратного вызова - их будут вызывать компоненты, т.к. напрямую у них доступа к изменению объекта нет
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false);
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  useEffect(() => {
    fetchPosts(limit, page)
  }, []) // [] массив зависимостей будет пустым, чтобы функция отработала 1 раз

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
      <MyButton onClick={fetchPosts} style={{margin: '30px 0'}}>Get post</MyButton>
      <MyButton onClick={() => setModal(true)} style={{margin: '30px 0'}}>Create post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      { postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }
      { isPostLoading
        ? <div style={{display:"flex", justifyContent: "center", marginTop: 50}}><MyLoader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPost} title="This is new titlE"/>
      }
      <MyPagination page={page} changePage={changePage} totalPages={totalPages}/>
    </div>
  );
}

export default App;
