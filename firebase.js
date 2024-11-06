var firebaseConfig = { 
    apiKey : "Use su clave de API aquí" , 
    authDomain : "ProyectoAMP.firebaseapp.com" , 
    databaseURL : "Use su databaseURL aquí" , 
    projectId : "projectamp-34fb1" , 
    storageBucket : "ProyectoAMP.appspot.com" , 
    messagesSenderId : "Use su messagesSenderId aquí" , 
    appId : "1:546700021782:web:d6818ad1e6bf38d4862537"
    }; 
   
   firebase. initializeApp (firebaseConfig); 
   
   var messagesRef = firebase. database () 
   . ref (); 
   
   document . getElementById ( 'contactForm' ) 
   . addEventListener ( 'submit' , submissionForm); 
   
   function  submissionForm ( e ) { 
   e. preventDefault (); 
   
   // Obtener valores 
   var fname = getInputVal ( 'fname' ); 
   var lname = getInputVal ( 'lname' ); 
   var phone = getInputVal ( 'phone' ); 
   var email = getInputVal ( 'email' ); 
   var message = getInputVal ( "message" ); 
   
   saveMessage (fname, lname, phone, email , message); document.getElementById 
   ( ' contactForm' ). reset (); } 
   /* Función para obtener los valores del formulario function getInputVal ( id ) { return document.getElementById ( id) .value ; }
    // Guardar el mensaje en firebase function saveMessage ( fname, lname, phone, email, message ) { var newMessageRef = messagesRef.push ( ); 
    newMessageRef.set ({ fname : fname, lname : lname, phone : phone, email : email, message : message, }); }*/