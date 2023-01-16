import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";

import { app, auth } from "../../firebase/config";

import { authSlice } from "./authReducer";
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password, image }) =>
  async (dispatch) => {
    console.log(login, email, password);
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: image,
      });

      const { uid, displayName, photoURL } = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
          email,
          logoImage: photoURL,
        })
      );
    } catch (error) {
      console.log("error.message.sign-up:", error.message);
    }
  };

export const authSignInUser = async (dispatch, getState) => {
  try {
    const user = await app.auth().createUserWithEmailAndPassword();
  } catch (error) {
    console.log(`error`, error.message);
  }
};

const authSignOutUser = async (dispatch, getState) => {};

// export { authSignInUser, authSignUpUser, authSignOutUser };
