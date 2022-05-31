import { getDatabase, ref, push,set, get, child, remove, update } from "firebase/database";


function DBKey (userEmail) {
    let dbkey =  "";
    for (let str of userEmail) {
        if (str === "@") break;
        dbkey += str;
    }
    return dbkey;
} 

export async function pushUserInfo (userEmail, userNickname) {
    const db = getDatabase();
    const dbkey = DBKey(userEmail);
    //user data 생송
    set(ref(db, 'users/' + dbkey), {
        email : userEmail,
        nickname : userNickname
    })

    //post data 생성
    const postListRef = ref(db, 'todos/' + dbkey);
    const newPostRef = push(postListRef);
    set(newPostRef, {
        title : "welcome to todo!",
        detail : "",
        category : "",
        date : "",
        isCompleted : false,
        isDeleted : false,
    });
}

//Todo 가져오기
export async function getTodos (userEmail, cb) {
    console.log("getTodos");
    const db = getDatabase();
    const dbkey = DBKey(userEmail);
    const todosRef = ref(db, 'todos/' + dbkey);
   const todos = await get(child(todosRef,'/')).then((snapshot) => {
    if (snapshot.exists()) return snapshot.val();
    else {
      return {};
    }
  }).catch((error) => {
    console.error(error);
  });
  cb(todos);
}

//Todo 쓰기
export function writeTodos (userEmail, Todos) {
    const db = getDatabase();
    const dbkey = DBKey(userEmail);
    const postListRef = ref(db, 'todos/' + dbkey);
    const newPostRef = push(postListRef);
    set(newPostRef, Todos);
}

//Todo 덮어쓰기
export function updateTodos (userEmail, todokey, todo) {
    const db = getDatabase();
    const dbkey = DBKey(userEmail);
    const todoRef = ref(db, 'todos/'+dbkey+'/'+todokey);
    update(todoRef, todo);
}

//User Info 가져오기
export async function getUserInfo (userEmail, cb) {
    const dbRef = ref(getDatabase());
    const dbkey = DBKey(userEmail);
    const userInfo = await get(child(dbRef, `users/${dbkey}`)).then((snapshot) => {
        if (snapshot.exists()) return snapshot.val();
        else {
          return {};
        }
      }).catch((error) => {
        console.error(error);
      });
      cb(userInfo);
    }

export async function removeTodos(userEmail, todokey) {
    const db = getDatabase();
    const dbkey = DBKey(userEmail);
    const todoRef = ref(db, 'todos/'+dbkey+'/'+todokey);
    remove(todoRef);
}

export async function getFeelings(userEmail, cb) {
  const dbRef = ref(getDatabase());
    const dbkey = DBKey(userEmail);
    const feelingsAll = await get(child(dbRef, `feelings/${dbkey}`)).then(
      (snapshot) => {
        if (snapshot.exists()) return snapshot.val();
        else {
          return {};
        }
      }).catch((error) => {
        console.error(error);
      });
      cb(feelingsAll);
}

export async function pushFeelings(userEmail, feelings, cb) {
  const db = getDatabase();
  const dbkey = DBKey(userEmail);
  const FeelListRef = ref(db, 'feelings/' + dbkey);
  const newPostRef = push(FeelListRef);
  set(newPostRef, feelings);
  cb(userEmail);
}
