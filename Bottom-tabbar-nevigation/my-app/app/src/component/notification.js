import { db } from '@/firebaseConfig'; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const saveNotificationToFirestore = async (notification) => {
    try {
      await addDoc(collection(db, "notifications"), {
        title: notification.title,
        email: notification.email,
        body: notification.body,
        createdAt: serverTimestamp(),
        read: false,
        // You can add more fields: userId, type, etc.
      });
    } catch (e) {
      console.error("Error adding notification: ", e);
    }
  };

  export default saveNotificationToFirestore