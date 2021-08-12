import React, {useState, useEffect, useRef} from 'react';
import {usePost} from '../hooks/usePosts';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import MyLoader from '../components/UI/loader/MyLoader';
import MyPagination from '../components/UI/pagination/MyPagination';
import '../styles/App.css';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPost = usePost(posts, filter.sort, filter.query)
  const lastElement = useRef()

  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page );
    setPosts([...posts, ...response.data])

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

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit]) // [] массив зависимостей будет пустым, чтобы функция отработала 1 раз

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton onClick={fetchPosts} style={{margin: '30px 0'}}>Get post</MyButton>
      <MyButton onClick={() => setModal(true)} style={{margin: '30px 0'}}>Create post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect 
        value={limit} 
        onChange={value => setLimit(value)}
        defaultValue="Elements count"
        option={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 20, name: '20'},
          {value: -1, name: 'All'},
        ]}
      />
      { postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPost} title="This is new titlE"/>
      <div ref={lastElement} style={{height: 20, background: 'red'}}></div>
      { isPostLoading &&
        <div style={{display:"flex", justifyContent: "center", marginTop: 50}}><MyLoader/></div>
      }
      <MyPagination page={page} changePage={changePage} totalPages={totalPages}/>
    </div>
  );
}

export default Posts;
