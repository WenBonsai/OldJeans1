import db from './firebaseConfig'; 
import { collection, addDoc } from "firebase/firestore";

export const addCustomer = async (customer) => {
  try {
    await addDoc(collection(db, "Customers"), customer);
  } catch (e) {
    console.error("Error adding customer: ", e);
  }
};

export const addArtist = async (artist) => {
  try {
    await addDoc(collection(db, "Artists"), artist);
  } catch (e) {
    console.error("Error adding artist: ", e);
  }
};

export const addPost = async (post) => {
  try {
    await addDoc(collection(db, "Posts"), post);
  } catch (e) {
    console.error("Error adding post: ", e);
  }
};

export const addTag = async (tag) => {
  try {
    await addDoc(collection(db, "Tags"), tag);
  } catch (e) {
    console.error("Error adding tag: ", e);
  }
};

export const addMessage = async (message) => {
  try {
    await addDoc(collection(db, "Inbox"), message);
  } catch (e) {
    console.error("Error adding message: ", e);
  }
};
