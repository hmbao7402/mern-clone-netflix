import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDqJxtubFohplcHj1GuApO3JhZG9EOK3f8',
	authDomain: 'humiba-clone-netflix.firebaseapp.com',
	projectId: 'humiba-clone-netflix',
	storageBucket: 'humiba-clone-netflix.appspot.com',
	messagingSenderId: '901418072766',
	appId: '1:901418072766:web:3324584e3843cb3ebf7cef',
	measurementId: 'G-CPPJ4BF31R',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { analytics, auth };