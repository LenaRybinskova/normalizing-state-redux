import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../../../src/features/app/store';
import {CommentType, deletePostComment} from '../../../../src/features/posts/comments-reducer';
import {AuthorAPIType} from '../../../../src/api/apiPosts';

type Props = {
    id: number,
    postId:number
}

export const Comment = ({id, postId}: Props) => {
    const comment = useSelector<AppRootStateType, CommentType>(state => state.comments.byId[id])
    const authorComment = useSelector<AppRootStateType, AuthorAPIType>(state => state.authors.byId[comment.authorId])
    const dispatch = useAppDispatch()

    if (!comment || !authorComment) {
        return null; // Возвращаем null, если данных нет, чтобы избежать ошибки
    }
    return (
        <li>
            <b>{authorComment.name}</b>
            <div>Comments: {comment.text}</div>
            <button onClick={() => dispatch(deletePostComment(postId,id))}>удалить пост</button>
        </li>
    );
};

