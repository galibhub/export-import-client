// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDfl_KvcszlhRi56gHc3PcxesNsW3RvXL8",
//   authDomain: "export-import-client.firebaseapp.com",
//   projectId: "export-import-client",
//   storageBucket: "export-import-client.firebasestorage.app",
//   messagingSenderId: "362815650042",
//   appId: "1:362815650042:web:55b74a25c9c05003d83143"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfl_KvcszlhRi56gHc3PcxesNsW3RvXL8",
  authDomain: "export-import-client.firebaseapp.com",
  projectId: "export-import-client",
  storageBucket: "export-import-client.firebasestorage.app",
  messagingSenderId: "362815650042",
  appId: "1:362815650042:web:55b74a25c9c05003d83143"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;  // ✅ Add this line