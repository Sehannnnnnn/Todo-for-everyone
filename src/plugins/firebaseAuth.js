import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export function loginUser(email, pw, cb) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pw)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        cb();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
    });
}

export function registerUser(email, pw) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pw)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert('회원가입 되었습니다!');
        return user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorCode, errorMessage);
    });
}
