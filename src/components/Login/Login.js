import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { Form, Button } from 'react-bootstrap';
import firebaseConfig from "../firebase.config";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState(
        {
            isSignedIn: false,
            displayName: '',
            email: '',
            photoURL: '',
            name: '',
            password: '',
            confirm_password: '',
            error: '',
            success: false,
        }
    )
    console.log(user)
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    // for google signIn
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                console.log(res)
                console.log(res.user)
                const { displayName, email, photoURL } = res.user
                console.log(displayName, email, photoURL)

                const signedInUser = {
                    isSignedIn: true,
                    displayName: displayName,
                    email: email,
                    photoURL: photoURL,
                }
                setUser(signedInUser)
                setLoggedInUser(signedInUser)
                history.replace(from);

            })
    }

    // for facebook  signIn
    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then(result => {

                const credential = result.credential;
                debugger
                const user = result.user;
                console.log("fb user ", user)
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                // ...
            });
    }
    const handleSignOut = () => {
        firebase.auth().signOut()
            .then((res) => {
                const signOutUser = {
                    isSignedIn: false,
                    displayName: '',
                    email: '',
                    name: '',
                    photoURL: '',
                }
                setUser(signOutUser)
            })
            .catch((error) => {
                // An error happened.
            });
    }
    console.log(user)

    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
        }
        if (event.target.name === "password") {
            isFieldValid = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/.test(event.target.value)
        }
        if (event.target.name === "confirm_password") {
            isFieldValid = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/.test(event.target.value)
        }
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[event.target.name] = event.target.value
            setUser(newUserInfo)
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password === user.confirm_password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const errorMessage = '';
                    const newUserInfo = { ...user }
                    newUserInfo.error = errorMessage
                    newUserInfo.success = true
                    setUser(newUserInfo)
                    console.log(errorMessage)
                    console.log(user.name)
                    updateUserName(user.name)
                    setLoggedInUser(newUserInfo)
                    history.replace(from)
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    const newUserInfo = { ...user }
                    newUserInfo.error = errorMessage
                    newUserInfo.success = false
                    setUser(newUserInfo)
                    console.log(errorMessage)
                });

        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    // Signed in
                    const errorMessage = '';
                    const newUserInfo = { ...user }
                    newUserInfo.error = errorMessage
                    newUserInfo.success = true
                    console.log(newUserInfo);
                    setUser(newUserInfo)
                    console.log("sign in user info ", res.user)
                    setLoggedInUser(newUserInfo)
                    history.replace(from)
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    const newUserInfo = { ...user }
                    newUserInfo.error = errorMessage
                    newUserInfo.success = false
                    setUser(newUserInfo)
                    console.log(errorMessage)
                });
        }
        e.preventDefault()
    }
    // update user info   => name ke firebase patanu
    const updateUserName = (name) => {
        console.log(name)
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log("Update successful.")
        }).catch(function (error) {
            console.log(error)
        });
    }
    console.log(user.displayName)
    return (
        <div>
            {
                user.isSignedIn ? <button onClick={handleSignOut}>sign out</button> :
                    <button onClick={handleSignIn}>sign in</button>
            } <br /><br />

            {/* facebook sign in */}
            <button onClick={handleFbSignIn}>login using facebook</button>

            {
                user.isSignedIn && <div>
                    <h1>{user.displayName}</h1>
                    <h2>{user.email} 📧</h2>
                    <img src={user.photoURL} alt="" width='100px' />
                </div>
            } <br /><br />



            <div class="d-flex justify-content-center">
                <Form onSubmit={handleSubmit} >
                    <h5>{newUser ? 'create an account' : "Log In"}</h5> <br />
                    <Form.Group controlId="formBasicEmail">

                        {
                            newUser && <input type="text" name="name" onBlur={handleBlur} onFocus={handleBlur} placeholder="your name" />
                        }
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" name='email' onBlur={handleBlur} onFocus={handleBlur} placeholder="your email" required />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="password" name="password" onBlur={handleBlur} placeholder="password" required />
                    </Form.Group>
                    {
                        newUser && <Form.Group controlId="formBasicEmail">
                            <Form.Control type="password" name="confirm_password" onBlur={handleBlur} placeholder="confirm_password" required />
                        </Form.Group>
                    }
                    <Button type="submit" >{newUser ? "Sign up" : "Log In"}</Button>
                    <Form.Group>
                        <label htmlFor="newUser">{newUser ? 'Already have an account ?' : "Don't Have an Account ?"} </label>
                        <button style={{ background: 'none', color: 'red', outline: 'none', border: 'none', textDecoration: 'underline', fontSize: '20px' }}
                            onClick={() => setNewUser(!newUser)} name="newUser">{newUser ? 'signIn' : 'create an account'}</button>
                    </Form.Group>
                </Form>
            </div>

            {
                user.success ? <h2 style={{ color: 'green' }}> user {newUser ? 'created' : 'logged In'} successfully</h2> :
                    <h5 style={{ color: 'red' }}> {user.error}</h5>
            }

        </div>
    );
};

export default Login;