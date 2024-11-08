import {useSelector} from 'react-redux';
import {Post} from '../features/posts/components/Post';
import {AppRootStateType, useAppDispatch} from '../features/app/store';
import {useEffect} from 'react';
import {fetchPosts} from 'features/posts/posts-reducer';

export const PostsPage = () => {
    const ids = useSelector((state: AppRootStateType) => state.posts.allIds);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    return (
        <div>
            {ids.map((id) => (
                <Post key={id} postId={id}/>
            ))}
        </div>
    );
};
