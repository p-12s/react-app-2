import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({ });
  const [fetchPostById, isLoading, error] = useFetching( async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
  });

  const [comments, setComments] = useState([]);
  const [fetchComments, isCommentLoading, errorComment] = useFetching( async (id) => {
    const response = await PostService.getCommentsById(id)
    setComments(response.data)
  });

  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, []);

  return (
    <div>
      <h1>PostIdPage {params.id}</h1>
      {isLoading
        ? <MyLoader />
        : <>
            <h2>{post.id} {post.title}</h2>
            <div>{post.body}</div>
          </>
      }
      <h3>Comments</h3>
      {isCommentLoading
        ? <MyLoader />
        : <>
            {comments.map(comment =>
              <div key={comment.id} style={{marginTop: 30}}>
                <h5>{comment.email}</h5>
                <div>{comment.body}</div>
              </div>  
            )}
          </>
      }
    </div>
  );
}

export default PostIdPage;
