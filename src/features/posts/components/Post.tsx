import {AuthorAPIType} from '../../../api/api';
import React, {useEffect, useState} from 'react';
import {PostType, updatePost} from 'features/posts/posts-reducer';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {useSelector} from 'react-redux';
import {updateAuthor} from '../../../../src/features/posts/authors-reducer';

type Props = {
    postId: number;
};

export const Post = ({postId}: Props) => {

    const post = useSelector<AppRootStateType, PostType>(state => state.posts.byId[postId])
    const author = useSelector<AppRootStateType, any>(state => state.authors.byId[post.authorId])
    const [editMode, setEditMode] = useState<boolean>(false);
    const [text, setText] = useState<string>(post.text);
    const [name, setName] = useState<string>(author.name);

    useEffect(() => {
        setName(author.name)
    }, [author])
    const dispatch = useAppDispatch()


    return (
        <div>
            {!editMode
                ? <b onClick={() => {
                    setEditMode(true)
                }}>{name}</b>
                : <textarea value={name} onChange={(e) => setName(e.target.value)} onBlur={() => {
                    dispatch(updateAuthor(author.id, name))
                    setEditMode(false)
                }}></textarea>}

            {!editMode && <span
                onDoubleClick={() => setEditMode(true)}>{text}</span>}

            {editMode && <textarea
                value={text}
                onChange={(event) => {
                    setText(event.currentTarget.value)
                }}
                onBlur={() => {
                    dispatch(updatePost(post.id, text))
                    setEditMode(false)
                }
                }>{text}</textarea>}
            <br/>
            likes:{post.likes}
            <hr/>
        </div>
    );
}
