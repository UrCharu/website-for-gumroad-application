// global variable for information storage and setup

// productArray stores lists of all the products. Each element is [Name, Creator, Price, Information] and represents a product
var productArray = [];

// Used as a way to get an index to access productArray because searching for an element in productArray would be O(n^2) if using two for loops
var indexingArray = [];

// Used as a record of which product buttons were clicked and the product's name
var recents = [];

// A list of a user's favorite products
var favorited = [];

// Event listener to get page running:
document.addEventListener("DOMContentLoaded", initialize);

// Functions for manipulating index.html:

// When home page first loads:
function initialize(){
    // Parameters: none
    // Return: none
    // Is meant to get webpage functionality working when webpage first loads. References other functions.

    // Getting the title to change attributes. parentTitle references the header element in index.html
    let parentTitle = document.getElementById("title");
    parentTitle.innerText = "Add and Favorite your Products!";

    // Creating add product button for user: when clicked, it will be able to add a product to the home page
    let productButton = document.createElement("button");
    productButton.setAttribute("id", "addProduct");

    // A section for the add product button so that it does not get organized next to website title. 
    let tempButtonDiv = document.createElement("div");
    tempButtonDiv.setAttribute("id", "divOfAddProduct");

    // Getting the main section and then adding text to it; when the page loads for the first time, there will be no products.
    let parentSection = document.getElementById("informationContent");
    parentSection.innerText = "Sorry, we have no content right now, press the above button if you have anything to add!";
    
    // An unordered list element that will contain list elements that take user to product pages.
    let listHolder = document.createElement("ul");

    //When the add product button is clicked, it will reference the createProductButton with input listHolder(that was just created)
    productButton.onclick = function() {
        createProductButton(listHolder)
    }
    // Text for add product button
    productButton.innerText = "Add Product!";

    // Adding the add product button to the before-mentioned tempButtonDiv with id="divofAddProduct"
    tempButtonDiv.appendChild(productButton);
    // Adding the div to the header element in index.html
    parentTitle.appendChild(tempButtonDiv);
   
}

// When the add product button is clicked, createProductButton is referenced. This function will create a button with the product name on it. 
function createProductButton(listHolder){
    // Parameters: An unordered list object that is referenced through the DOM, named listHolder
    // Return: none
    // Is meant to prompt user for input about a product's values such as it's name, who made it, it's price, and any information about it. Then creates a list element("li") and adds a
    // button to it. When button is clicked, it will reference loadProductInformation() with the most recently clicked button's name in order to display poduct information. 

    // Prompting user about product details such as it's name, who or what made it, the product's price, and any information about it.
    let name = prompt("Product name:",);                       
    let creator = prompt("Product creator:",);
    let price = prompt("Product price:",);
    let information = prompt("Product information:",);
    
    // Giving the unordered list element referenced though listHolder an id
    listHolder.setAttribute("id", "listElementHolder");

    // Adding product information to productArray and indexingArray where it can be stored. Making sure information is added at the same time so indexingArray 
    // can be used to reference productArray. 
    productArray.push([name, creator, price, information]);
    indexingArray.push(name);
    
    // Getting the <section> html tag with the id, and storing it as parent
    let parent = document.getElementById("informationContent");
    // Giving parent the text below as well as making it display all of the user's favorite products(when they are able to favorite products)
    parent.innerText  = "View our products here! Additionally, view your favorite products here: " + favorited;
    
    // Creating the <li> element that will be added to <ul> and storing it as listElement
    let listElement = document.createElement("li");
    
    // The button element stored as "temp"
    const temp = document.createElement("button");
    // Making the button display the name of the product so user knows that when clicked that the clicked product's information will be shown
    temp.innerText = name;
    // Also giving the button an id of the product's name
    temp.setAttribute("id", name);
    
    // When the button is clicked:
    temp.onclick = function(){
        // Add the button's id(the product's name) to the recents array. This allows it to be used as input in loadProductInformation
        recents.push(temp.id);
        // Reference loadProductInformation with it's input being the last element in recents 
        loadProductInformation(recents[recents.length-1]);
        }

    // Adding the product button to <li>    
    listElement.appendChild(temp);
    // Adding <li> to <ul>(<ul> is referenced through the parameter ListHolder)
    listHolder.appendChild(listElement);
    // Adding <ul> to <section>
    parent.appendChild(listHolder);
}

// When a product page has to load, loadPorductInformation is referenced. This function will display product information, a favorite checkbox, and a return to home page.
function loadProductInformation(target){
    // Parameters: The product's name, referenced as "target"
    // Return: none
    // Is meant to load a page full of details of the product that was clicked. 

    // Accessing productArray by finding the position of the product's name in indexingArray(by referencing FindIndex) and storing the product's information
    // in a local variable called productList
    productList = productArray[findIndex(indexingArray, target)];
    
    //Removing div elements and <ul> from the DOM because they will interfere in showing product information
    removeElement("listElementHolder");
    removeElement("divOfAddProduct");
    
    // Accessing the <section> and storing it as "parentSection"
    let parentSection = document.getElementById("informationContent");
    // Creating a div just to display the product's name, giving it an id of "productName"
    let productName = document.createElement("div");
    productName.setAttribute("id", "productName");
    // Creating a div just to display the product's creator, giving it an id of "productCreator"
    let productCreator = document.createElement("div");
    productCreator.setAttribute("id", "productCreator");
    // Creating a div just to display the product's price, giving it an id of "productPrice"
    let productPrice = document.createElement("div");
    productPrice.setAttribute("id", "productPrice");
    // Creating a div just to display the product's information, giving it an id of "productInformation"
    let productInformation = document.createElement("div");
    productInformation.setAttribute("id", "productInformation");

    // Giving each respective div element the information it is meant to store. 
    productName.innerText = "Product name: " + productList[0];
    productCreator.innerText = "Product creator: " + productList[1];
    productPrice.innerText = "Product price: " + productList[2];
    productInformation.innerText = "Additional product information: " + productList[3];
    // Adding each div to the <section> element
    parentSection.appendChild(productName);
    parentSection.appendChild(productCreator);
    parentSection.appendChild(productPrice);
    parentSection.appendChild(productInformation);
    
    // Adding a favorite checklist for user. If user likes product, they can check the box and store the product to a favorites list. 
    // Creating the div element for the checkbox, giving it an id of "favoriteButtonDiv"
    let favoriteButtonDIV = document.createElement("div");
    favoriteButtonDIV.setAttribute("id", "favoriteButtonDiv")
    // Making the checkbox itself
    let favoriteButton = document.createElement("input");
    favoriteButton.setAttribute("type", "checkbox");
    // Adding text so the user can identify the checkbox as a favorite checkbox
    favoriteButtonDIV.innerText = "Check if it is a favorite item.";

    // If the product information page is reloaded, this if-else statement makes sure that the checkbox will remain checked or unchecked if it has not been
    // checked or unchecked before by looking at the list of products that have been marked favorite in the "favorited" list.
    if(elementInList(favorited,target)){
        // If the checkbox was marked when the product page was left, then make it checked when product page is reloaded
        favoriteButton.checked = true;
    } else{
        // if the checkbox was unmarked when the product page was left, then make it unchecked when product page is reloaded
        favoriteButton.checked = false;
    }

    // When the favorite checkbox is checked or unchecked:
    favoriteButton.onclick = function() {
        // if-else statement to see is checkbox was marked or unmarked.
        if(favoriteButton.checked == true){
            // If the checkbox is marked, then add the product's name to the list of favorite products("favorited")
            favorited.push(target);
        } else if((elementInList(favorited, productList[0]) && favoriteButton.checked == false)) {
            // If the checkbox is unmarked and if it is in the list of favorite products("favorited") then remove it from "favorited"
            favorited.splice(findIndex(favorited, target),1);
        }
    }

    // Adding favorite checkbox to it's respective div element
    favoriteButtonDIV.appendChild(favoriteButton);
    // Adding the div element with favorite checkbox to <section>
    parentSection.appendChild(favoriteButtonDIV);

    // Adding a return to main page button
    // Finding the <header> element and storing it as "returnButtonMainParent"
    let returnButtonMainParent = document.getElementById("title");

    // Creating a div just for the return button, storing it as "returnButtonSubParent"
    let returnButtonSubParent = document.createElement("div");
    // Creating the return button itself, storing it as "returnButton"
    let returnButton = document.createElement("button");
    // Giving "returnButton" an id of "returnButton"
    returnButton.setAttribute("id", "returnButton");

    // When the return to home button(returnButton) is clicked:
    returnButton.onclick = function(){
        // Kill the following elements by their id's using the function removeElement
        removeElement("returnButton");
        removeElement("productName");
        removeElement("productCreator");
        removeElement("productPrice");
        removeElement("productInformation");
        removeElement("favoriteButtonDiv");

        // Making a new unordered list element <ul> for the home page and giving it an id of "listElementHolder". Storing this element as listHolder
        let listHolder = document.createElement("ul");
        listHolder.setAttribute("id", "listElementHolder");

        // Regenerate the home page using the function regeneratePage with inputs of the length of productArray and unordered list listHolder.
        regeneratePage(productArray.length, listHolder);
    }
    // Giving the return to home page button("returnButton") some text to indicate to user it's functionality
    returnButton.innerText = "Return to home";
    // Adding returnButton to the div element returnButtonSubParent.  
    returnButtonSubParent.appendChild(returnButton);
    // Adding the div element returnButtonSubParent to the header element <header> referenced by returnButtonMainParent
    returnButtonMainParent.appendChild(returnButtonSubParent);
}

// When the home page has to be reloaded when coming back from a product page, regeneratePage is referenced. This function will display a add product button, all of the user's 
// favorite products, and all the products that exist(with a button that takes user to their respective pages).
function regeneratePage(length, ulList){
    // Parameters: length of productArray(represented as "length"), and an unordered list <ul> represented through the DOM(represented as ulList);
    // Return: None
    // Reloads home screen

    // Getting the <section> element and storing it as parent
    let parent = document.getElementById("informationContent")
    // Creating a div to display favorite products and storing it as favoriteTab and giving it the text below to display all elements in the list of favorite products(favorited)
    let favoriteTab = document.createElement("div");
    favoriteTab.innerText = "These are your favorite products: " + favorited;
    
    // Seeing if there are any products by checking if the length of productArray(length) is 0 or not.
    if (length == 0 ){
        // Telling user there are no products and lightly prompting them to use the add product button
        parent.innerText = "Sorry, we have no content right now, press the above button if you have anything to add!";
    } else {
        // If there are elements in productArray, then tell user to look at the products.
        parent.innerText  = "View our products here!";

        // Going through all the elements in productArray and creating a button with the product's name on it.
        for(i=0; i<length; i++){
            // Creating a list element <li> and storing it as listElement
            let listElement = document.createElement("li");
            // Creating a button element <button> and storing it as temp and making it display the product's name as text. Also making the button's id the product's name
            const temp = document.createElement("button")
            temp.innerText = productArray[i][0];
            temp.setAttribute("id", productArray[i][0]);
            // When the button is clicked:
            temp.onclick = function(){
                // Add the name of the product that was clicked to recents so it can be used as input for loadProductInformation
                recents.push(temp.id);
                // Refrencing loadProductInformation with the most recently clicked item stored as the last element in recents
                loadProductInformation(recents[recents.length-1]);
            }
            // Adding the button to <li>
            listElement.appendChild(temp);
            // Adding <li> to <ul> refrenced through the parameter ulList
            ulList.appendChild(listElement);
        }
        // Adding the unordered list <ul> to <section> refrenced through parent
        parent.appendChild(ulList);
    }

    // Creating a div for the add product button and storing it as parentHeaderDiv
    let parentHeaderDiv = document.createElement("div");
    // Getting the <header> tag and storing it as parentHeader
    let parentHeader = document.getElementById("title");
    // Creating add product button and storing it as productButton
    let productButton = document.createElement("button");
    // Giving productButton the id "divOfAddProduct"
    productButton.setAttribute("id","divOfAddProduct" );

    // When the add product button(productButton) is clicked:
    productButton.onclick = function(){
        // Refrence createProductButton with the input ulList(which is just an unordered list element <ul> stored in the DOM)
        createProductButton(ulList);
    }
    // Button label for users to click the button and add their own product
    productButton.innerText = "Add Products"
    
    // Adding the button to the div element parentHeaderDiv
    parentHeaderDiv.appendChild(productButton);
    // Adding the div element parentHeaderDiv to the header <header>
    parentHeader.appendChild(parentHeaderDiv);

    // Adding favoriteTab(the div that shows users the products they have marked as favorites) to the bottom of <section>
    parent.appendChild(favoriteTab);
}

// Functions for list operations and making code easier to read and make:

// Removes an element from the DOM
function removeElement(id) {
    // Parameters: id of element that needs to be removed
    // Return: destroys the element in the DOM refrenced by id
    // Is meant to remove an element from view

    // Stores a variable elem as the element with id in the DOM
    var elem = document.getElementById(id);
    // Removes elem from DOM as return
    return elem.parentNode.removeChild(elem);
}

// Finds the index of a specified element in a list
function findIndex(list, target){
    // Parameters: the list in question(stored as list), and the element in the list(stored as target)
    // Return: if the target is in the list, then return the index i of the first instance that target is in list. If target is not in list, returns nothing
    // Finds index of an element in a list

    // Traversal: using a local variable i, that starts at 0 and is incremented until jut before it is equal to the length of the list, finds 
    // the first instance target is found in list
    for(i=0;i<list.length;i++){
        // If the list element at index i is equal to target return the index value
        if(target == list[i]){
            return i;
        }
    }
}

// Says if an element is in a list or not
function elementInList(list, target){
    // Parameters: list in question(stored as list), and something in(or not) list(stored as target)
    // Return: If target is in the list, returns true. If target is not in the list, returns false
    // Returns a boolean value depending on whether an element is in the list or not.

    // Traversal: using a local variable i, starting at 0 and incrementing until just before it is equalt to the length of the list, checks each element
    // of the list to the target.
    for(i=0;i<list.length;i++){
        // If target is equal to the value of the list at index i, then return true
        if(target == list[i]){
            return true;
        }
    }
    // If all elements were checked and target was never equal to any elements in list, then return false
    return false;
}