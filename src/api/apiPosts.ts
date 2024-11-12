export type AuthorAPIType = { id: number; name: string };
export type CommentAPIType = { id: number; text: string, author: AuthorAPIType };

export type PostAPIType = {
    id: number;
    text: string;
    likes: number;
    author: AuthorAPIType;
    lastComments: CommentAPIType[]
};

export const apiPosts = {
    getPosts(): Promise<PostAPIType[]> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res([
                    {
                        id: 1,
                        text: 'hello',
                        likes: 10,
                        author: {id: 1, name: 'Dima'},
                        lastComments: [
                            {id: 998, text: 'cool', author: {id: 3, name: 'Sveta'}},
                            {id: 997, text: ' very cool', author: {id: 3, name: 'Sveta'}}]
                    },
                    {id: 2, text: 'React', likes: 11, author: {id: 21, name: 'Valera'},
                        lastComments: []},
                    {
                        id: 3,
                        text: 'Angular',
                        likes: 100,
                        author: {id: 1, name: 'Dima'},
                        lastComments: [
                            {id: 900, text: 'Света что то написала', author: {id: 3, name: 'Sveta'}},
                            {id: 996, text: 'Дима что то ответил',author: {id: 1, name: 'Dima'}}]
                    }
                ]);
            }, 2000);
        });
    },
    updatePost(postId: number, text: string) {
        return Promise.resolve({})
    },
    getComments(postId: number) {
        return Promise.resolve([
            {id: 996, text: '11111', author: {id: 3, name: 'Sveta'}},
            {id: 995, text: '22222', author: {id: 1, name: 'Dima'}},
            {id: 994, text: '333', author: {id: 3, name: 'Sveta'}},
            {id: 993, text: '444', author: {id: 1, name: 'Dima'}},
            {id: 992, text: '555', author: {id: 3, name: 'Sveta'}},
            {id: 991, text: '666', author: {id: 1, name: 'Dima'}},
        ])
    }
}


