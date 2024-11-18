import React, { useEffect, useState } from "react";
import { PostType, updatePost } from "features/posts/posts-reducer";
import { AppRootStateType, useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { updateAuthor } from "features/posts/authors-reducer";
import { Comment } from "features/posts/components/Comment";
import { fetchPostComment } from "features/posts/comments-reducer";
import styled from "styled-components";
import likeIcon from "../../../assets/icons/like.svg";

type Props = {
  postId: number;
};

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
  //   background-color: bisque;
`;

const CommnetsPost = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;

  & img {
    width: 50px;
    border-radius: 50%;
  }
`;

const PostText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 3px;
`;

const Likes = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: var(--background-like-color);
  padding: 3px 5px;
  width: fit-content;
  border-radius: 10px;
  color: var(--background-like-text-color);

  & svg {
    width: 18px;
    height: 18px;
    color: var(--background-like-text-color);
    fill: currentColor;
  }
`;

const Line = styled.div`
  border-bottom: 1px solid var(--background-like-color);
`;

export const Post = ({ postId }: Props) => {
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
    <PostContainer>
      <PostHeader>
        <PostTitle>
          <img src={author.avatar} />
          {!editMode ? (
            <b
              onClick={() => {
                setEditMode(true);
              }}
            >
              {name}
            </b>
          ) : (
            <textarea
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => {
                dispatch(updateAuthor(author.id, name));
                setEditMode(false);
              }}
            ></textarea>
          )}
        </PostTitle>

        <PostText>
          {!editMode && (
            <span onDoubleClick={() => setEditMode(true)}>{text}</span>
          )}
          <Likes>
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="1280.000000pt"
              height="1189.000000pt"
              viewBox="0 0 1280.000000 1189.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <metadata>
                Created by potrace 1.15, written by Peter Selinger 2001-2017
              </metadata>
              <g
                transform="translate(0.000000,1189.000000) scale(0.100000,-0.100000)"
                fill="currentColor"
                stroke="none"
              >
                <path
                  d="M3250 11884 c-25 -2 -106 -11 -180 -20 -1485 -172 -2704 -1295 -3001
-2764 -133 -660 -67 -1507 171 -2223 252 -753 675 -1411 1397 -2172 342 -360
634 -630 1588 -1470 231 -203 488 -430 570 -505 1024 -920 1735 -1692 2346
-2547 l130 -183 132 0 132 1 130 192 c557 822 1212 1560 2185 2461 191 178
408 373 1027 923 956 852 1445 1343 1841 1850 643 825 968 1603 1064 2553 19
196 17 665 -5 835 -105 805 -441 1497 -998 2054 -557 557 -1250 894 -2054 998
-193 24 -613 24 -810 0 -733 -93 -1379 -387 -1920 -874 -191 -172 -406 -417
-535 -610 -30 -45 -57 -82 -60 -82 -3 0 -30 37 -60 82 -129 193 -344 438 -535
610 -531 478 -1170 773 -1878 867 -146 20 -562 34 -677 24z"
                />
              </g>
            </svg>
            likes:{post.likes}
          </Likes>
        </PostText>
      </PostHeader>
      <Line></Line>
      <CommnetsPost>
        {editMode && (
          <textarea
            value={text}
            onChange={(event) => {
              setText(event.currentTarget.value);
            }}
            onBlur={() => {
              dispatch(updatePost(post.id, text));
              setEditMode(false);
            }}
          >
            {text}
          </textarea>
        )}
        <br />

        <div>Comments:</div>
        <ul>
          {post.commentsIds.map((id) => (
            <Comment key={id} id={id} postId={postId} />
          ))}
        </ul>
        <button onClick={() => dispatch(fetchPostComment(postId))}>
          all comments
        </button>
      </CommnetsPost>

      <hr />
    </PostContainer>
  );
};
