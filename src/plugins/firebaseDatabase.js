import { getDatabase, ref, push,set, onValue, get, child } from "firebase/database";


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


export function getTodos (userEmail, cb) {
    const db = getDatabase();
    const dbkey = DBKey(userEmail);
    const todosRef = ref(db, 'todos/' + dbkey);
    const todos = [];
    onValue(todosRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            todos.push(childSnapshot.val());
        })
    })
    cb(todos);
}

export async function getUserInfo (userEmail, cb) {
    const dbRef = ref(getDatabase());
    const dbkey = DBKey(userEmail);
    const userInfo = await get(child(dbRef, `users/${dbkey}`)).then((snapshot) => {
        if (snapshot.exists()) return snapshot.val();
        else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
      cb(userInfo);
    }

