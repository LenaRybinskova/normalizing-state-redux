import DimaAvatar from "./../../src/assets/icons/Dima.png";
import SvetaAvatar from "./../../src/assets/icons/Sveta.png";
import ValeraAvatar from "./../../src/assets/icons/Valera.png";

console.log(DimaAvatar);

export type AuthorAPIType = { id: number; name: string; avatar: string };
export type CommentAPIType = {
  id: number;
  text: string;
  author: AuthorAPIType;
};

export type PostAPIType = {
  id: number;
  text: string;
  likes: number;
  author: AuthorAPIType;
  lastComments: CommentAPIType[];
};

export const apiPosts = {
  getPosts(): Promise<PostAPIType[]> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res([
          {
            id: 1,
            text: "Styled-components is the result of wondering how we could enhance CSS for styling React component systems.",
            likes: 10,
            author: {
              id: 1,
              name: "Dima",
              avatar: DimaAvatar
            },
            lastComments: [
              {
                id: 998,
                text: "Lorem ipsum dolor sit ",
                author: {
                  id: 3,
                  name: "Sveta",
                  avatar: SvetaAvatar
                }
              },
              {
                id: 997,
                text: "amet consectetur adipisicing elit. Quia, a?",
                author: {
                  id: 3,
                  name: "Sveta",
                  avatar: SvetaAvatar
                }
              }
            ]
          },
          {
            id: 2,
            text: "Angular is an application-design framework and development platform for creating efficient and sophisticated single-page apps.",
            likes: 11,
            author: {
              id: 21,
              name: "Valera",
              avatar: ValeraAvatar
            },
            lastComments: []
          },
          {
            id: 3,
            text: "React has a community of millions of developers. On this page we’ve listed some React-related communities that you can be a part of; see the other pages in this section for additional online and in-person learning materials",
            likes: 100,
            author: {
              id: 1,
              name: "Dima",
              avatar: DimaAvatar
            },
            lastComments: [
              {
                id: 900,
                text: "Света что то написала",
                author: {
                  id: 3,
                  name: "Sveta",
                  avatar: SvetaAvatar
                }
              },
              {
                id: 996,
                text: "Дима что то ответил",
                author: {
                  id: 1,
                  name: "Dima",
                  avatar: DimaAvatar
                }
              }
            ]
          }
        ]);
      }, 2000);
    });
  },
  updatePost(postId: number, text: string) {
    return Promise.resolve({});
  },
  getComments(postId: number) {
    return Promise.resolve([
      {
        id: 996,
        text: "11111",
        author: { id: 3, name: "Sveta", avatar: SvetaAvatar }
      },
      {
        id: 995,
        text: "22222",
        author: { id: 1, name: "Dima", avatar: DimaAvatar }
      },
      {
        id: 994,
        text: "333",
        author: { id: 3, name: "Sveta", avatar: SvetaAvatar }
      },
      {
        id: 993,
        text: "444",
        author: { id: 1, name: "Dima", avatar: DimaAvatar }
      },
      {
        id: 992,
        text: "555",
        author: { id: 3, name: "Sveta", avatar: SvetaAvatar }
      },
      {
        id: 991,
        text: "666",
        author: { id: 1, name: "Dima", avatar: DimaAvatar }
      }
    ]);
  }
};
