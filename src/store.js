import {createStore, combineReducers, compose} from "redux";
import firebase from "firebase";
import "firebase/firestore";
import {reactReduxFirebase, firebaseReducer} from "react-redux-firebase";
import {reduxFirestore, firestoreReducer} from "redux-firestore";
import notifyReducer from "./reducers/notify";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
	apiKey: "AIzaSyCRPRGVc1KJYqsMQnaJxGOgZIxDyJhYAWg",
    authDomain: "reactclientpanel-9d3ae.firebaseapp.com",
    databaseURL: "https://reactclientpanel-9d3ae.firebaseio.com",
    projectId: "reactclientpanel-9d3ae",
    storageBucket: "reactclientpanel-9d3ae.appspot.com",
    messagingSenderId: "741742883571"
};

//react-redux-firebase config

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

//init firebase instance 
firebase.initializeApp(firebaseConfig);
//init firestore
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);


//add reactreduxfirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer
});

//Check for settings in localstorage
if(localStorage.getItem("settings") === null) {
  //default settings 
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false}

    //set to localStorage
    localStorage.setItem("settings", JSON.stringify(defaultSettings));
}


//create initial state 
const initialState = {settings: JSON.parse(localStorage.getItem("settings"))};

//create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
	reactReduxFirebase(firebase),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;