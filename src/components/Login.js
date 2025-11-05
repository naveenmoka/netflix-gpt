import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSingInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSingInForm);
  };
  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) return;
    if (!isSingInForm) {
      // Sign Up Logio
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="h-screen object-cover" src={BG_URL} alt="logo" />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSingInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSingInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-sm">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSingInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {!isSingInForm
            ? "Already Registered?Enjoy it"
            : "New to Netfilx? Sign Up Now"}
        </p>
      </form>
    </div>
  );
};
export default Login;
