import React, { useState } from "react";
import "./styles.css";
import Input from "../input/Input";
import Button from "../button/Button";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { data, useNavigate } from "react-router-dom";

const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function signUpWithEmail() {
    // Authenticate the user, or basically create a new user account suing email and password
    setLoading(true);
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            toast.success("User Created Successfully");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
            //Create a doc with user id as the following id
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and Confirm Password Don't Match!");
        setLoading(false);
      }
    } else {
      toast.error("All Fields are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    //Make sure that the doc with uid doesn't exist
    //Create a doc
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });

        toast.success("Doc Created!");
        setLoading(false);
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try{
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>>>", user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("User Authenticated!");

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } catch(err){
      toast.error(err.message);
      setLoading(false)
    }
  }

  function loginUsingEmail() {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In!");
          console.log("User Logged In", user);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All Field are Mandatory!");
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely</span>
          </h2>

          <form action="">
            <Input
              label={"Email"}
              type={"email"}
              placeholder={"johndoe@gmail.com"}
              state={email}
              setState={setEmail}
            />
            <Input
              label={"Password"}
              type={"password"}
              placeholder={"Example@123"}
              state={password}
              setState={setPassword}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using Email and Password"}
              onClick={loginUsingEmail}
              blue={false}
            />
            <p style={{ textAlign: "center", margin: "0" }}>or</p>
            <Button
              onClick={googleAuth}
              disabled={loading}
              text={loading ? "Loading..." : "Login using Google"}
              blue={true}
            />
            <p className="p-login">
              Or Don't Have An Account Already?{" "}
              <a
                onClick={() => setLoginForm(!loginForm)}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Click Here
              </a>
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely</span>
          </h2>

          <form action="">
            <Input
              label={"Full Name"}
              placeholder={"John Doe"}
              state={name}
              setState={setName}
            />
            <Input
              label={"Email"}
              type={"email"}
              placeholder={"johndoe@gmail.com"}
              state={email}
              setState={setEmail}
            />
            <Input
              label={"Password"}
              type={"password"}
              placeholder={"Example@123"}
              state={password}
              setState={setPassword}
            />
            <Input
              label={"Confirm Password"}
              type={"password"}
              placeholder={"Example@123"}
              state={confirmPassword}
              setState={setConfirmPassword}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Sign Up using Email and Password"}
              onClick={signUpWithEmail}
              blue={false}
            />
            <p style={{ textAlign: "center", margin: "0" }}>or</p>
            <Button
              onClick={googleAuth}
              disabled={loading}
              text={loading ? "Loading..." : "Sign Up using Google"}
              blue={true}
            />
            <p className="p-login">
              Or Have An Account Already?{" "}
              <a
                onClick={() => setLoginForm(!loginForm)}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Click Here
              </a>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSignin;
