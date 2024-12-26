import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Fetch posts from Firestore
export async function getPosts(): Promise<{ id: string; title: string; content: string; imageUrl: string }[]> {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as { title: string; content: string; imageUrl: string }),
  }));
}

// Add a post to Firestore
export async function addPost(post: { title: string; content: string; imageUrl: string }): Promise<void> {
  await addDoc(collection(db, 'posts'), post);
}
