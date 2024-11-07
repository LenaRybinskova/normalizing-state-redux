import {PostType} from '../../../api/api';
import React, {useState} from 'react';
import {updatePost} from '../reducer';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {useSelector} from 'react-redux';

type Props = {
    postId: number;
};

export const Post = ({postId}: Props) => {

    const post = useSelector<AppRootStateType, PostType>(state => state.posts.byId[postId])
    const [editMode, setEditMode] = useState<boolean>(false);
    const [text, setText] = useState<string>(post.text);

    const dispatch = useAppDispatch()
    console.log('post:', post)
    return (
        <div>
            <b>{post.author.name}</b>
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
