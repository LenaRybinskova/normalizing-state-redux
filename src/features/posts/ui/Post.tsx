import React, {useEffect, useState} from 'react';
import {PostType, updatePost} from 'features/posts/model/posts-reducer';
import {AppRootStateType, useAppDispatch} from 'app/store';
import {useSelector} from 'react-redux';
import {updateAuthor} from 'features/authors/model/authors-reducer';
import {Comment} from 'features/comments/ui/Comment';
import styled from 'styled-components';
import {ReactComponent as LikeIcon} from 'assets/icons/like.svg';
import {ButtonShowComments} from 'common/components/ButtonShowComments';
import {Container} from 'common/components/Container';

const PostHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: var(--background-like-color);
    border-radius: 15px;
    padding: 5px;
    color: var(--text-color);
`;

const PostTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    transition-duration: 0.9s;

    & img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    & span {
        padding: 10px 10px;
        cursor: pointer;
    }

    & span:hover {
        color: var(--text-color-hover);
    }
`;

const StyledTextarea = styled.textarea`
    width: 100%;
    height: 40px;
    font-family: var(--primary-font);
    font-size: var(--font-size);
    border: 1px solid var(--text-color);
    line-height: 20px;
    padding: 10px 10px;
    resize: none;
    box-sizing: border-box;
    overflow: hidden;
    background-color: var(--background-color);
    transition-duration: 0.9s;
    border-radius: 15px;
    color: var(--text-color);
`;

const PostText = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;

    & span {
        padding: 10px 10px;
        cursor: pointer;
    }

    & span:hover {
        color: var(--text-color-hover);
    }
`;

const Likes = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: var(--background-like-color);
    padding: 3px 8px;
    width: fit-content;
    border-radius: 15px;
    color: var(--text-color);
    margin: 8px 8px 0 8px;
    border: 1px solid var(--text-color);

    & svg {
        width: 18px;
        height: 18px;
        color: var(--background-like-text-color);
        fill: currentColor;
    }
`;

const PostBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-inline: 40px 10px;
`;

const PostBodyItems = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 3px;
`;

const Line = styled.div`
    border-bottom: 1px solid var(--background-like-color);
    margin: 5px;
`;

type Props = {
    postId: number;
};

export const Post = ({postId}: Props) => {
    const post = useSelector<AppRootStateType, PostType>(
        (state) => state.posts.byId[postId]
    );
    const author = useSelector<AppRootStateType, any>(
        (state) => state.authors.byId[post.authorId]
    );

    const [editMode, setEditMode] = useState<boolean>(false);
    const [text, setText] = useState<string>(post.text);
    const [name, setName] = useState<string>(author.name);

    useEffect(() => {
        setName(author.name);
    }, [author]);

    const dispatch = useAppDispatch();

    return (
        <Container post>
            <PostHeader>
                <PostTitle>
                    <img src={author.avatar}/>
                    {!editMode ? (
                        <span
                            onClick={() => {
                                setEditMode(true);
                            }}
                        >
              {name}
            </span>
                    ) : (
                        <StyledTextarea
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                setName(e.target.value)
                            }
                            onBlur={() => {
                                dispatch(updateAuthor(author.id, name));
                                setEditMode(false);
                            }}
                        ></StyledTextarea>
                    )}
                </PostTitle>

                <PostText>
                    {!editMode && (
                        <span onDoubleClick={() => setEditMode(true)}>{text}</span>
                    )}
                    {editMode && (
                        <StyledTextarea
                            value={text}
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setText(event.currentTarget.value);
                            }}
                            onBlur={() => {
                                dispatch(updatePost(post.id, text));
                                setEditMode(false);
                            }}
                        >
                            {text}
                        </StyledTextarea>
                    )}
                    <Likes>
                        <LikeIcon/>
                        {post.likes}
                    </Likes>
                </PostText>
            </PostHeader>
            <Line></Line>

            <PostBody>
                <PostBodyItems>
                    {post.commentsIds.map((id) => (
                        <Comment key={id} id={id} postId={postId}/>
                    ))}
                </PostBodyItems>
                <ButtonShowComments postId={postId}/>
            </PostBody>
        </Container>
    );
};
