import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { Form, Button } from 'react-bootstrap';
import firebaseConfig from "../firebase.config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';


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
    const googleSignIn = () => {
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
        if (user.password !== user.confirm_password) {
            const newUserInfo = { ...user }
            newUserInfo.error = "password doesn't match"
            setUser(newUserInfo)

        }
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
                            newUser && <Form.Group controlId="formBasicName">
                                <Form.Control type="text" name="name" onBlur={handleBlur} onFocus={handleBlur} placeholder="Name" required />
                                {/* <input type="text" name="name" onBlur={handleBlur} onFocus={handleBlur} placeholder="your name" /> */}
                            </Form.Group>
                        }
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" name='email' onBlur={handleBlur} onFocus={handleBlur} placeholder="Email" required />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="password" name="password" onBlur={handleBlur} placeholder="Password" required />
                        <span id="passwordHelpBlock" class="form-text text-muted ">
                            Your password must be 6-20 characters long, contain letters and numbers.
                        </span>
                    </Form.Group>
                    <Form.Group>
                        {
                            user.success ? <p style={{ color: 'green' }}> user {newUser ? 'created' : 'logged In'} successfully</p> :
                                <p style={{ color: 'red' }}> {user.error}</p>
                        }
                    </Form.Group>
                    {
                        newUser && <Form.Group controlId="formBasicEmail">
                            <Form.Control type="password" name="confirm_password" onBlur={handleBlur} placeholder="Confirm Password" required />
                        </Form.Group>
                    }
                    <Button type="submit" >{newUser ? "Sign up" : "Log In"}</Button>
                    <Form.Group>
                        <label htmlFor="newUser">{newUser ? 'Already have an account ?' : "Don't Have an Account ?"} </label>
                        <button style={{ background: 'none', color: 'red', outline: 'none', border: 'none', textDecoration: 'underline', fontSize: '20px' }}
                            onClick={() => setNewUser(!newUser)} name="newUser">{newUser ? 'signIn' : 'create an account'}</button>
                    </Form.Group>
                    <Form.Group>
                        <button onClick={googleSignIn} type="button" class="btn btn-outline-success"><FontAwesomeIcon icon={faFacebook} />
                            <span class="p-4">Continue with Google</span>
                        </button>
                    </Form.Group>

                </Form>
            </div>

            {/* {
                user.success ? <h2 style={{ color: 'green' }}> user {newUser ? 'created' : 'logged In'} successfully</h2> :
                    <h5 style={{ color: 'red' }}> {user.error}</h5>
            } */}

        </div>
    );
};

export default Login;