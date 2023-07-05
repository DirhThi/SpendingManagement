import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs, updateDoc, where ,query} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlbdlxp30lzlLaldIq62HRpJhHqlTMDL4",
  authDomain: "appt-ac877.firebaseapp.com",
  projectId: "appt-ac877",
  storageBucket: "appt-ac877.appspot.com",
  messagingSenderId: "225961154918",
  appId: "1:225961154918:web:fdced675880b955c6410a7",
  measurementId: "G-RMS0E2MWV8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const createAccount = async (email, password, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(auth.currentUser, {
      displayName: fullName
    });

    // Create a user document in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      email: user.email,
      fullName: fullName
    });

    console.log('User account created:', user);
  } catch (error) {
    console.log('Error creating user account:', error);
    throw error;
  }
};
export const getWalletInfo = async (currentEmail) => {
  try {
    const walletRef = collection(db, 'wallet');
    const q = query(walletRef, where('email', '==', currentEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const walletData = querySnapshot.docs[0].data();
      const ten = walletData.ten;
      const soien = walletData.soien;
      
      console.log('Ten:', ten);
      console.log('Soien:', soien);
      
      return { ten, soien };
    } else {
      console.log('No wallet found for the current email');
      return null;
    }
  } catch (error) {
    console.log('Error retrieving wallet info:', error);
    throw error;
  }
};
export const updateEmailInWallet = async (mathe, password, email) => {
  try {
    const walletRef = collection(db, 'wallet');
    const q = query(walletRef, where('mathe', '==', mathe), where('password', '==', password));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, { email });
      console.log('Email updated in the wallet collection');
    } else {
      console.log('No matching card code and password found');
    }
  } catch (error) {
    console.log('Error updating email in wallet collection:', error);
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User logged in:', user);
    return user;
  } catch (error) {
    console.log('Error logging in:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log('Error logging out:', error);
  }
};

const updatePassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    console.log('Password updated successfully');
  } catch (error) {
    console.log('Error updating password:', error);
    throw error;
  }
};

export { auth, createAccount, login, updateProfile, signOut };
export { db };