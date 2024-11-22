## В проекте использовались библиотеки:

- React
- Redux
- React-Redux
- Redux-thunk
- Styled-component
- react-loader-spinner

---

> ### Убрать у PostsPage избыточный ререндер всех дочерних компонент Post:

> ### 2 вариант: нормализовать стейт, итеррироваться по массиву ключей( в котором не будет происх измений), в Post передавать id поста, где будет следить useSelector

```
const state = {
   allIds:[1, 2],
   byId:{
     "1": {id: 1, text: 'hello', likes: 10, author: {id: 1, name: 'Dima'}},
     "2": {id: 2,text: 'React', likes: 11,author: {id: 21, name: 'Valera'}}
   }
}
```

```
export const PostsPage = () => {
    const ids = useSelector((state: AppRootStateType) => state.posts.allIds);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    return (
        <div>
            {ids.map((id) => (
                <Post key={id} postId={id}/>
            ))}
        </div>
    );
};

```

```
export const Post = ({postId}: Props) => {

    const post = useSelector<AppRootStateType, PostType>(state => state.posts.byId[postId])
    const [editMode, setEditMode] = useState<boolean>(false);
    const [text, setText] = useState<string>(post.text);

```

> ### 1 вариант: обернуть Post в memo

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
