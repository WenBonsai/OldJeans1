// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCMwyrKLb8YWzzc7j1U0_efT01K4jTaT34",
    authDomain: "oldjeans1-5dbbe.firebaseapp.com",
    projectId: "oldjeans1-5dbbe",
    storageBucket: "oldjeans1-5dbbe.appspot.com",
    messagingSenderId: "279762862098",
    appId: "1:279762862098:web:7cc0c65e9bfa7f222298cb",
    measurementId: "G-93R9ELLMJF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addCustomer() {
    try {
      await addDoc(collection(db, "Customers"), {
        Name: "Customer Name",
        Email: "customer@email.com",
        Password: "hashed_password",
        CustomerID: "some_customer_id",
        Area: "some_area"
      });
    } catch (e) {
      console.error("Error adding customer: ", e);
    }
  }

export default db;
