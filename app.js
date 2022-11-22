BASE_URL = "https://luckyanimals.herokuapp.com/"

var a = document.getElementById('drawAN');
var outputanimals = document.getElementById('output-Animal');
var outputlastnames = document.getElementById('output-lastname')
var outputage = document.querySelector('#output-age')

var anlist = [];
var animals = [" Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
// a.innerHTML = "Draw a Chinses 12 lucky animals:";



var notRegisterButton = document.querySelector('#not-register-button');
notRegisterButton.onclick = function(){
    document.querySelector('.login-form').style.display ='none';
    document.querySelector('.register-form').style.display ='block';

}
var notLoginButton = document.querySelector('#not-login-button');
notLoginButton.onclick = function(){
    document.querySelector('.login-form').style.display ='block';
    document.querySelector('.register-form').style.display ='none';

}

var starNewDrawing = document.querySelector("#start-new-draw");
starNewDrawing.onclick = function(){
    document.querySelector('#drawing-output').style.display ='none';
    document.querySelector("#star-button").style.display = 'block';
    var currentLoginUser = document.querySelector('#show-login-user');
    currentLoginUser.innerHTML = ("Start New Drawing! ");
};


    



// login function

var loginButton = document.querySelector('#login-button');
loginButton.onclick = function(){
    var loginEmail = document.querySelector('#login-email');
    var loginPass = document.querySelector('#login-password');
    
    loginUserFromServer(loginEmail.value, loginPass.value);
    
    
            

    
    
}



var createUserButton = document.querySelector('#create-userbutton');
createUserButton.onclick = function(){
    var firstNameInput = document.querySelector('#input-firstname')
    var lastNameInput = document.querySelector('#input-lastname')
    var inputEmail = document.querySelector('#input-email');
    var inputPass = document.querySelector('#input-password');
    createUserFromServer(firstNameInput.value, lastNameInput.value, inputEmail.value, inputPass.value);
    
}





var starButton = document.querySelector("#star-button");
var drawingTable = document.querySelector('#draw-table');
var drawingOutput = document.querySelector('#drawing-output');
starButton.onclick = function(){
    starButton.style.display ='none';
    drawingTable.style.display ='block';
    drawingOutput.style.display = 'none';
    document.querySelector('#edit-table').style.display ='none';
}

var drawButton = document.querySelector("#draw-button");

drawButton.onclick = function() {
    drawingOutput.style.display = 'block';
    drawingTable.style.display = 'none';
    
    var nameInput = document.querySelector("#inputName")
    outputlastnames.innerHTML = nameInput.value

    var ageInput = document.querySelector("#inputAge")
    var contactInput = document.querySelector("#inputContact")
    var quantityInput = document.querySelector("#inputQuantity")


    var drawAnimal = animals[Math.floor(Math.random() * animals.length)];
    outputanimals.innerHTML = drawAnimal;
    console.log(drawAnimal);
    createAnimalsOnServer(nameInput.value, 
        ageInput.value,
        contactInput.value,
        quantityInput.value,
        drawAnimal);

  
}


function createAnimalsOnServer(name, age, contact, quantity, animal){
    var data = "name=" + encodeURIComponent(name) 
    + "&" + "age="  + encodeURIComponent(age)
    + "&" + "contact="  + encodeURIComponent(contact)
    + "&" + "quantity="  + encodeURIComponent(quantity)
    + "&" + "animal="  + encodeURIComponent(animal);

    fetch("https://luckyanimals.herokuapp.com/luckyanimals", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then (function(response){
        //server has reponded
        loadAnimalsFromServer()
    
    });
    // function createAnimalsOnServer(AnimalNames, lastnames, yearAge){
    //     var data = "name" + encodeURIComponent(lastnames);
    //     data += "&age"  + encodeURIComponent(yearAge) 
    //     data += "&animal" + encodeURIComponent(AnimalNames)
    
}
/// create user from server
function createUserFromServer(firstname, lastname, email, password){
    var data = "first_name=" + encodeURIComponent(firstname) 
    + "&" + "last_name="  + encodeURIComponent(lastname)
    + "&" + "email="  + encodeURIComponent(email)
    + "&" + "password="  + encodeURIComponent(password);

    fetch("https://luckyanimals.herokuapp.com/users", {
        credentials: "include",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then (function(response){
        //server has reponded
        if (response.status == '201') {
            console.log('User has been Created')
            document.querySelector('.login-form').style.display ='block';
            document.querySelector('.register-form').style.display ='none';
            var createLoginUser = document.querySelector('#show-login-user');
            createLoginUser.innerHTML = ("User has been Created, Please login ");

        } else if (response.status == '422'){
            console.log('Create user fail');
            alert("User already exist");
        }
    });

}


// login from server
function loginUserFromServer(loginEmail, loginPass){
    var data = "email=" + encodeURIComponent(loginEmail) 
    + "&" + "password="  + encodeURIComponent(loginPass);

    fetch("https://luckyanimals.herokuapp.com/sessions" ,{
        credentials: "include",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then (function(response){
        if (response.status == '201'){
            LoadResourceCollection();
        } else if (response.status == '401'){
            var failloginMessage = document.querySelector('#fail-login-message')
            alert('The user name or password is incorrect');
        } 
    });

}












// var editbutton = document.querySelector("#edit-button");
// editbutton.onclick = function(){
    
//     var nameEdit = document.querySelector("#editName")
//     var ageEdit = document.querySelector("#editAge")
//     var contactEdit = document.querySelector("#editName")
//     var quantityEdit = document.querySelector("#editName")

//     console.log(nameEdit.value)

//     updateAgeFromServer(ageEdit,drawanimal.age,drawanimal.contact,drawanimal.quantity, drawanimal.animal,drawanimal.id);

//     };


function deleteAnimalFromServer(member_id){

    fetch("https://luckyanimals.herokuapp.com/luckyanimals/" + member_id, {
        credentials: "include",
        method: "DELETE"
    }).then (function(response){
        //server has reponded
        loadAnimalsFromServer();
    });

}

function updateAgeFromServer(member_name, member_age, member_contact, member_quantity, draw_animal, member_id){
    var data = "name=" + encodeURIComponent(member_name) 
    + "&" + "age="  + encodeURIComponent(member_age) 
    + "&" + "contact="  + encodeURIComponent(member_contact) 
    + "&" + "quantity="  + encodeURIComponent(member_quantity)
    + "&" + "animal="  + encodeURIComponent(draw_animal);

    fetch("https://luckyanimals.herokuapp.com/luckyanimals/" + member_id ,{
        credentials: "include",
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then (function(response){
        //server has reponded
        
        loadAnimalsFromServer();
    });

}

function loadAnimalsFromServer() {
    
    fetch("https://luckyanimals.herokuapp.com/luckyanimals", {
        credentials: "include"
    }).then (function(response){
    // the server has now reponded to request
    // ...
    
    response.json().then(function(data){
        // the JSON data is unpacked and ready for us
        console.log("data from the serever", data);
        console.log(response.status);
        animalOject = data;
       
       

        var anlist = document.querySelector("#an-name-list")
        anlist.innerHTML = "";
        var nameEdit = document.querySelector("#editName")    
        var ageEdit = document.querySelector("#editAge")
        var contactEdit = document.querySelector("#editContact")   
        var quantityEdit = document.querySelector("#editQuantity")
        var animalEdit = document.querySelector('#editAnimal');
        var idEdit = document.querySelector('#editId');
        
        //for animal in AnimalsNames
        animalOject.forEach(function(drawanimal){
            var newAnListItem = document.createElement("li")

            var nameDiv = document.createElement("div1");
            nameDiv.innerHTML = "Name: " + drawanimal.name;
            nameDiv.classList.add("drawer-name");

            var ageDiv = document.createElement("div");
            ageDiv.innerHTML = " Age: " + drawanimal.age
            ageDiv.classList.add("drawing-age");


            
            var contactDiv = document.createElement("div");
            contactDiv.innerHTML = " Contact: " + drawanimal.contact
            contactDiv.classList.add("drawing-contact");

            var quantityDiv = document.createElement("div");
            quantityDiv.innerHTML = " Quantity: " + drawanimal.quantity
            quantityDiv.classList.add("drawing-quantity");
            

            var animalDiv = document.createElement("div");
            animalDiv.innerHTML = " Animal: " + drawanimal.animal;
            animalDiv.classList.add("drawing-animal");

    
        //////delete & update button
            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.onclick = function(){
                // what to do when
                console.log("delete clicked", drawanimal.id);
                if (confirm("are you sure? " + "Delete "+ drawanimal.email + "?")){
                    deleteAnimalFromServer(drawanimal.id);
                }
            };


            var updateButton = document.createElement("button");
            updateButton.innerHTML = "Edit";
            updateButton.onclick = function(){
                // what to do when
                
                document.querySelector('#draw-table').style.display ='none';
                document.querySelector('#drawing-output').style.display ='none';
                var edittable = document.querySelector('#edit-table')
                edittable.style.display= "block";
                
                console.log(drawanimal.name)
                nameEdit.value= drawanimal.name     
                ageEdit.value = drawanimal.age
                contactEdit.value = drawanimal.contact     
                quantityEdit.value = drawanimal.quantity
                animalEdit.value = drawanimal.animal
                idEdit.value = drawanimal.id
      
                
                
                
            };     
            newAnListItem.appendChild(nameDiv);
            newAnListItem.appendChild(ageDiv);
            newAnListItem.appendChild(contactDiv);
            newAnListItem.appendChild(quantityDiv);
            newAnListItem.appendChild(animalDiv);
            
           
            newAnListItem.appendChild(deleteButton);
            newAnListItem.appendChild(updateButton);

            anlist.appendChild(newAnListItem);

            // newAnListItem.innerHTML = animal;
            // anlist.appendChild(newAnListItem);
        });

        // Edit Table button
        var editbutton = document.querySelector("#edit-button");
            editbutton.onclick = function(){
                document.querySelector('#edit-table').style.display = 'none';
                console.log("update clicked", nameEdit.value,
                ageEdit.value,
                contactEdit.value,
                quantityEdit.value,
                animalEdit.value,
                idEdit.value);
                
                updateAgeFromServer(nameEdit.value,
                    ageEdit.value,
                    contactEdit.value,
                    quantityEdit.value,
                    animalEdit.value,
                    idEdit.value);



                

            };
        var cancelbutton = document.querySelector("#cancel-button");
        cancelbutton.onclick = function(){
            window.location.reload(true)
            var edittable = document.querySelector('#edit-table')
                edittable.style.display= "none";
        }
        
        

    });
});
}


function LoadResourceCollection(){

    fetch("https://luckyanimals.herokuapp.com/luckyanimals", {
        credentials: "include",
    }).then (function(response){
        //server has reponded
        if (response.status == '200') {
            console.log('login')
            loadAnimalsFromServer()
            document.querySelector('.form').style.display ='none';
            var currentLoginUser = document.querySelector('#show-login-user');
            currentLoginUser.innerHTML = ("You are login! ");
            
            document.querySelector('#nav').style.display ='block';
            document.querySelector('#drawing-form').style.display ='block';

            var logOutButton = document.createElement('button');
            logOutButton.innerHTML = "Sign Out"
            logOutButton.onclick = function(){
            console.log('logout click')
            logoutFromServer()
            }
            currentLoginUser.appendChild(logOutButton)
        } else if (response.status == '401'){
            console.log('Not login')
            document.querySelector('#drawing-form').style.display ='none';
            document.querySelector('#nav').style.display ='none';
            document.querySelector('.form').style.display ='block';
            var currentLoginUser = document.querySelector('#show-login-user');
            currentLoginUser.innerHTML = ("Pleae login ");
            

            

        }

    });

}

function logoutFromServer(){
    fetch("https://luckyanimals.herokuapp.com/sessions", {
        credentials: "include",
        method: "DELETE"
    }).then (function(response){
        //server has reponded
        LoadResourceCollection()
    });

}





LoadResourceCollection()












