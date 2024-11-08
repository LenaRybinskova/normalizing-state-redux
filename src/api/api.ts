export type AuthorAPIType = { id: number; name: string };

export type PostAPIType = {
    id: number;
    text: string;
    likes: number;
    author: AuthorAPIType;
};

export const api = {
    getPosts(): Promise<PostAPIType[]> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res([
                    {id: 1, text: 'hello', likes: 10, author: {id: 1, name: 'Dima'}},
                    {
                        id: 2,
                        text: 'React',
                        likes: 11,
                        author: {id: 21, name: 'Valera'}
                    },
                    {
                        id: 3,
                        text: 'Angular',
                        likes: 100,
                        author: {id: 1, name: 'Dima'}
                    }
                ]);
            }, 2000);
        });
    },
    updatePost(postId: number, text: string) {
        return Promise.resolve({})
    },
    updateAuthor(authorId: number, newName: string) {
        return Promise.resolve({})
    },
}

