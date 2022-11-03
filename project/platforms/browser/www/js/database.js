
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-yV8RDi1Ww3YpTmwkZpmQkS934s5RwxE",
  authDomain: "winky-d52e8.firebaseapp.com",
  projectId: "winky-d52e8",
  storageBucket: "winky-d52e8.appspot.com",
  messagingSenderId: "289336849912",
  appId: "1:289336849912:web:0b04e4d7a6e5d921dd120d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// R E G I S T E R   H T M L  Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  first_name = document.getElementById('first_name').value


  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Something went wrong! Try again!')
    return
    // Don't continue running the code
  }
  if (validate_field(first_name) == false)
  {
    alert('Something went wrong! Try again!')
    return 
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      first_name : first_name,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User created with success! You will be redirected to the login page!')
    window.location="../html/home.html";
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  if(email == "admin@stadantwerpen.be"){

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Something went wrong! Try again!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('Login success!')
    window.location="../html/profile2.html"

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}  else{
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or password is wrong!')
    return
    // Don't continue running the code
  }
   
  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('Login succceed!')
    window.location.href= "../html/profile.html"
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}