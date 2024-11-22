import styled from 'styled-components';
import React, {useState} from 'react';
import {useAppDispatch} from 'app/store';
import {fetchPostComment} from 'features/comments/model/comments-reducer';
import {hideAllComments} from 'features/posts/model/posts-reducer'

const ButtonShowAllComments = styled.button`
    display: flex;
    background-color: transparent;
    border: none;
    font-family: "Nunito Sans", sans-serif;
    cursor: pointer;
    color: var(--text-color);
    font-size: 14px;

    &:hover {
        opacity: 0.5;
        text-decoration: underline;
        color: var(--text-color-hover);
    }
`;

type Props = {
    postId: number;
};

export const ButtonShowComments = ({postId}: Props) => {
    const dispatch = useAppDispatch();
    const [showBtn, setShowBtn] = useState(true);

    const handleShowBtn = () => {
        dispatch(fetchPostComment(postId)).then(() => setShowBtn(false));
    };

    const handleHideBtn = () => {
        dispatch(hideAllComments(postId));
        setShowBtn(true);
    };

    return (
        <>
            {showBtn ? (
                <ButtonShowAllComments onClick={handleShowBtn}>
                    показать еще комментарии
                </ButtonShowAllComments>
            ) : (
                <ButtonShowAllComments onClick={handleHideBtn}>
                    скрыть комментарии
                </ButtonShowAllComments>
            )}
        </>
    );
};
