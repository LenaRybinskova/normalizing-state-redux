export type AuthorType = { id: number; name: string };

export type PostType = {
    id: number;
    text: string;
    likes: number;
    author: AuthorType;
};

export const api = {
    getPosts(): Promise<PostType[]> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res([
                    {id: 1, text: 'hello', likes: 10, author: {id: 1, name: 'Dima'}},
                    {
                        id: 2,
                        text: 'React',
                        likes: 11,
                        author: {id: 21, name: 'Valera'}
                    }
                ]);
            }, 2000);
        });
    },
    updatePost(postId: number, text: string) {
        return Promise.resolve({})
    }
}

