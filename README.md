# 1 вариант: убрать у PostsPage ререндер всех дочерних компонент Post - обернуть Post в memo

```
const state = {
    items: [
        {id: 1, text: 'hello', likes: 10, author: {id: 1, name: 'Dima'}}, 
        {id: 2,text: 'React', likes: 11,author: {id: 21, name: 'Valera'}}
    ]
}
```


 ```
export const PostsPage = () => {
    const items = useSelector((state: AppRootStateType) => state.posts.items);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    return (
        <div>
            {items.map((i) => (
                <Post key={i.id} post={i}/>
            ))}
        </div>
    );
};

```