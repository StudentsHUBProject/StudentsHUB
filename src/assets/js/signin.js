const firebaseConfig = {
      apiKey: "AIzaSyBD6YHrZOiJ-dMINmDkv0I1mVAtHzhFFYk",
      authDomain: "studentshub-d8464.firebaseapp.com",
      projectId: "studentshub-d8464",
      storageBucket: "studentshub-d8464.appspot.com",
      messagingSenderId: "589575577952",
      appId: "1:589575577952:web:c2dae028ec506c5b9e3e05"
    };

const app = firebase.initializeApp(firebaseConfig);

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      alert("Loggato con successo con " + authResult.user.displayName);
      console.log(authResult);
      return true;
    },
    uiShown: function() {
      document.getElementById('loader').style.display = 'none';
    }
  },
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);
