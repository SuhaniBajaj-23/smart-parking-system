const { useDebugValue } = require("react");

const firebaseConfig = {
    apiKey: "AIzaSyD_uAtD2vIKqM7ZOPc7tj9Swwp2m2jMQP8",
    authDomain: "smart-parking-baeb5.firebaseapp.com",
    projectId: "smart-parking-baeb5",
    storageBucket: "smart-parking-baeb5.appspot.com",
    messagingSenderId: "194105433567",
    appId: "1:194105433567:web:f34d174a4118644cd2386a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const database = firebase.database()

  function register(){
    fname=document.getElementById('fname').value 
    lname=document.getElementById('lname').value 
    gender=document.getElementById('gender').value
    email=document.getElementById('email').value
    age=document.getElementById('age').value 
    pass=document.getElementById('pass').value 
    confirmpass=document.getElementById('confirmpass').value 
    number=document.getElementById('number').value 


    if(validate_email(email)==false || validate_password(pass)==false ||validate_confirmpass(confirmpass)==false){
        alert("email or password is outta line")
    }

    if(validate_field(fname)==false || validate_field(lname)==false || validate_field(gender)==false || validate_field(age)==false || validate_field(number)==false ){
        alert("all fields required")
    }

    if(validate_age(age)==false){
        alert("enter appropriate age")
    }

    if(validate_gender(gender)==false){
        alert("enter appropriate gender")
    }

    if(validate_number(number)==false){
        alert("enter appropriate mobile number")
    }
  }

  auth.createUserWithEmailAndPassword(email,pass)
  .then(function(){
    var user=auth.currentUser

    var database_ref=database.ref()

    var user_data={
        email:email,
        fname:fname,
        lname:lname,
        gender:gender,
        age:age,
        number:number,
        confirm_pass:confirm_pass,
        pass:pass,
        last_login:Date.now()
    }

    database_ref.child('user/'+user.uid).set(user_data)

    alert('user created')
  })
  .catch(function(error){
    var error_code=error.error
    var error_message=error.message
    alert(error_message)
  })

  function login(){
    email=document.getElementById('email').value
    password=document.getElementById('pass').value

    if(validate_email(email)==false || validate_password(pass)==false ){
        alert("email or password is out of line")
        return
    }

  }

  auth.signInWithEmailAndPassword(email,pass)
  .then(function(){
    var user=auth.currentUser

    var database_ref=database.ref()

    var user_data={
        last_login:Date.now()
    }

    database_ref.child('user/'+user.uid).update(user_data)

    alert('user logged in')
  })
  .catch(function(error){
    var error_code = error.code 
    var error_message = error.message

    alert(error_message)
  })

  function validate_email(email){
    expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if(expression.test(email)==true){
        return true
    }else{
        return false
    }
  }

  function validate_password(pass){
    if(password<6){
        return false
    }else{
        return true
    }
  }

  function validate_age(age){
    expression = /^[1-9]?[0-9]{1}$|^100$/    ;
    if(expression.test(age)==true){
        return true
    }else{
        return false
    }
  }

  function validate_gender(gender){
    if(gender !="male" || gender!="female"){
        return false;
    }else{
        return true;
    }
  }

  function validate_confirmpass(confirmpass){
    if(confirmpass!=pass){
        return false
    }else{
        return true
    }
  }

  function validate_number(number){
    if(number<10 || number>10){
        return false
    }else{
        return true
    }
  }

  function validate_field(field){
    if(field==null){
        return false
    }
    if(field.length<=0){
        return false
    }else{
        return true
    }
  }