import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../src/features/app/store';
import {CommentType} from '../../../../src/features/posts/comments-reducer';
import {AuthorAPIType} from '../../../../src/api/apiPosts';

type Props = {
    id: number
}

export const Comment = ({id}: Props) => {
    const comment = useSelector<AppRootStateType, CommentType>(state => state.comments.byId[id])
    const authorComment = useSelector<AppRootStateType, AuthorAPIType>(state => state.authors.byId[comment.authorId])
console.log("authorComment", authorComment)

    return (
        <li>
            <b>
                {authorComment.name}
            </b>
            <div>Comments: {comment.text}</div>
        </li>
    );
};

