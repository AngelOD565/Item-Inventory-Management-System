/**
 * here is the javascript for index.html for the items API
 */


const URL = 'http://localhost:8282/items';
let allItems = [];

/**
 * document - gives access to html elements
 * 
 * event listeners are how we respond to events in the html
 * 
 */
document.addEventListener('DOMContentLoaded', () => {
    /**
     * DOM - Document Object Model
     *  
     *  DOMContentLoaded is an event that fires when the DOM is loaded
     *      page loads and refreshes
     * 
     */


    /**
     * AJAX - Asynchronous JavaScript and XML
     * 
     *  the primary object of AJAX, is XmlHttpRequest (XHR)
     * 
     */

    let xhr = new XMLHttpRequest();         // creating a new XHR object (this puts it into state 0 - unsent)

    /**
     * onreadystatechange - is a callback that fires everytime the state of the xhr changes
     * 
     *      5 stages (ready states):
     *          0 - unsent
     *          1 - opened
     *          2 - headers received
     *          3 - loading
     *          4 - done        ---> this is the main one we care about
     */
    xhr.onreadystatechange = () => {

        /**
         * strict equality (===) and regular equality (==) in JS
         *      strict equality checks values and data types
         *      regualr equality only checks values
         * 
         *      ex: 4 === '4' is false but 4 == '4' is true
         */
        if(xhr.readyState === 4) {
            // at readyState 4, we have our response from the server 

            // responseText contains the response from the server
            // JSON.parse() parses the JSON into js objects
            let items = JSON.parse(xhr.responseText);

            // add items to table
            items.forEach(newItem => {
                addItemToTable(newItem);
            });

        }

    };

    // use open to set the request method and the url to send the request to (state changed to 1 - opened)
    xhr.open('GET', URL);

    // this sends the request 
    xhr.send();

});


////////////////////////////////////////////
///// POST REQUEST AND ADDING TO TABLE /////
////////////////////////////////////////////

document.getElementById('new-item-form').addEventListener('submit', (event) => {

    // event object gives info about the event that we are listening for
    event.preventDefault();         //preventDefault() is going to prevent the form from refreshing the page 

    /**
     * one option to grab form data is to call document.getElementById().value for each input field
     * 
     * a beter option is to us FORM DATA
     * 
     * FormData provides all the data from a form in an easy to work with obect
     */

    // FormData takes in the html tags for your form
    let inputData = new FormData(document.getElementById('new-item-form'));

    let newItem = {
        // use .get() to retrieve a field from form data and pass in the NAME attribute from the <input> tag
        name : inputData.get('new-item-name'),         
        rarity : inputData.get('new-item-rarity'),
        warehouse : {
            id : inputData.get('new-warehouse-id'),
            warehouseName : inputData.get('new-warehouse-name')}
        

    }


    /**
     * 
     * rather than using raw xhr objects, we can use fetch()
     * 
     * 
     * fetch() is a built-in function that can send http requests
     *      fetch() returns a Promise
     * 
     *      PROMISES
     *          something that will return.. eventually
     *          happen asynchronously from the rest of your program
     * 
     *      ASYNC and AWAIT
     *          use async on function to tell you program that the function returns a promise
     * 
     *          use await to tell our program to wait for some asynchronous operation
     *              they can ONLY be used inside async functions
     */
    doPostRequest(newItem);

});

async function doPostRequest(newItem) {

    let returnedData = await fetch(URL + '/item', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'         // make sure your server is expecting to receive JSON in the body
        },
        body : JSON.stringify(newItem)      // turns a js object into JSON
    });

    // .json() to deserialize the JSON back into js object - this ALSO returns a promise
    let itemJson = await returnedData.json();

    console.log('ITEM JSON' + itemJson);

    // just need to add item to table
    additemToTable(itemJson);

    // reset the form
    document.getElementById('new-item-form').reset();
}

function addItemToTable(newItem) {

    // DOM Manipulation - where we manually change the DOM

    // creting all necessary DOM elements
    let tr = document.createElement('tr');      // will create a <tr> tag
    let id = document.createElement('td');      // will create a <td> tag for item id
    let name = document.createElement('td');      // will create a <td> tag for item name
    let rarity = document.createElement('td');      // will create a <td> tag for item rarity
    let warehouse = document.createElement('td');      // will create a <td> tag for director
    let editBtn = document.createElement('td');      // will create a <td> tag for edit button
    let deleteBtn = document.createElement('td');      // will create a <td> tag for delete button

    id.innerText = newItem.id;
    name.innerText = newItem.name;
    rarity.innerText = newItem.rarity;
    warehouse.innerText = newItem.warehouse.warehouseName + ' ' + newItem.warehouse.id;
    

    editBtn.innerHTML = 
    `<button class="btn btn-primary" id="edit-button" onclick="activateEditForm(${newItem.id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-button" onclick="activateDeleteForm(${newItem.id})">Delete</button>`;

    // adds the <td> tags as nested children to the tr> tag
    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(rarity);
    tr.appendChild(warehouse);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    // setting the idattribute for the <tr>
    tr.setAttribute('id', 'TR' + newItem.id);

    // adds the <tr> tag to the <tbody> tag
    document.getElementById('item-table-body').appendChild(tr);

    // adding the new item to the list of all the items
    allItems.push(newItem);

}


///////////////////////////////////////////
///// CANCEL BUTTONS AND FORM TOGGLES /////
///////////////////////////////////////////

document.getElementById('update-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllForms();
});

document.getElementById('delete-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllForms();
    
});

function resetAllForms() {

    // clears data from all forms
    document.getElementById('new-item-form').reset();
    document.getElementById('update-item-form').reset();
    document.getElementById('delete-item-form').reset();

    // dispalys only the new-item-form
    document.getElementById('new-item-form').style.display = 'block';
    document.getElementById('update-item-form').style.display = 'none';
    document.getElementById('delete-item-form').style.display = 'none'; 
}

function activateEditForm(itemId) {
    // find the item and its <tr> that needs to be edited
    for(let i of allItems) {
        if(i.id === itemId) {
            document.getElementById('update-item-id').value = i.id;
            document.getElementById('update-item-name').value = i.name;
            document.getElementById('update-item-rarity').value = i.rarity;
            document.getElementById('update-warehouse-id').value = i.warehouse.id;
            document.getElementById('update-warehouse-name').value = i.warehouse.warehouseName;
        }
    }

    // showing only the edit form
    document.getElementById('new-item-form').style.display = 'none';
    document.getElementById('update-item-form').style.display = 'block';   // block is the default for showing a tag
    document.getElementById('delete-item-form').style.display = 'none';

}

function activateDeleteForm(itemId) {
    // find the item and its <tr> that needs to be edited
    for(let i of allItems) {
        if(i.id === itemId) {
            document.getElementById('delete-item-id').value = i.id;
            document.getElementById('delete-item-name').value = i.name;
            document.getElementById('delete-item-rarity').value = i.rarity;
            document.getElementById('delete-warehouse-id').value = i.warehouse.id;
            document.getElementById('delete-warehouse-name').value = i.warehouse.warehouseName;
        }
    }

    // showing only the edit form
    document.getElementById('new-item-form').style.display = 'none';
    document.getElementById('update-item-form').style.display = 'none';
    document.getElementById('delete-item-form').style.display = 'block';   // block is the default for showing a tag
    
}


/////////////////////////////////////////////////
///// UPDATE REQUEST AND CHANGING THE TABLE /////
/////////////////////////////////////////////////

document.getElementById('update-item-form').addEventListener('submit', (event) => {
    event.preventDefault();		// prevent default form actions from occuring

    // retrieving data from the update form
    let inputData = new FormData(document.getElementById('update-item-form'));

    // MAKE SURE TO INCLUDE IDS WHEN DOING A PUT REQUEST
    let item = {
        id : document.getElementById('update-item-id').value,    // FormData cannot access values from disabled fields
        name : inputData.get('update-item-name'),         
        rarity : inputData.get('update-item-rarity'),
        warehouse : {
            id : document.getElementById('update-warehouse-id').value,
            warehouseName : inputData.get('update-warehouse-name')
        }
    }

    /**
     * alternative/preferred way to handle promises:
     *      rather than using async/await, we can use .then() and pass in a callback function
     * 
     *      .then will run whenever the promise returns succesfully
     *      .catch will run whenever the promise returns unsuccessfully
     */
    fetch(URL + '/item', {
        method : 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(item)
    })
    .then((data) => {
        // this will handle all 100, 200, and 300 status code responses
        
        // we still need to serialize the response into JSON
        return data.json();
    })
    .then((itemJson) => {          // handling the promise returned by data.json (*** this is where we update the table ***)
        
        // adding the updated item to our table
        updateItemInTable(itemJson);

        // reset the forms
        document.getElementById('update-item-form').reset();
        document.getElementById('new-item-form').style.display = 'block';
        document.getElementById('update-item-form').style.display = 'none';
    })
    .catch((error) => {
        // this will handle all 400 and 500 status code responses

        console.error(error);   // generally, you never want to use console.log() - especially in a production environment
    })
});

function updateItemInTable(item) {
    document.getElementById('TR' + item.id).innerHTML = `
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.rarity}</td>
    <td>${item.warehouse.warehouseName}</td>
    <td><button class="btn btn-primary" id=editButton" onclick="activateEditForm(${item.id})">Edit</button></td>
    <td><button class="btn btn-primary" id=deleteButton" onclick="activateDeleteForm(${item.id})">Delete</button></td>
    `;
}


//////////////////////////////////////////////////
///// DELETE REQUEST AND REMOVING FROM TABLE /////
//////////////////////////////////////////////////

document.getElementById('delete-item-form').addEventListener('submit', (event) => {
    event.preventDefault();		// prevent default form actions from occuring


    // get the data from the form since all the fields are disabled and FormData won't capture them
    let itemId = document.getElementById('delete-item-id').value;
    let nameOnForm = document.getElementById('delete-item-name').value;		
    let rarityOnForm = document.getElementById('delete-item-rarity').value;	
    let warehouseId = document.getElementById('delete-warehouse-id').value;
    let warehouseName = document.getElementById('delete-warehouse-name').value;

    // creating the item object that needs to be deleted
    let item = {
        id : itemId,
        name : nameOnForm,
        rarity : rarityOnForm,
        warehouse : {
            id : warehouseId,
            warehouseName : warehouseName
        }
    };

    // sending delete request
    fetch(URL + '/item', {
        method : 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(item)
    })
    .then((data) => {

        // delete request returns no-content so there's no need to deserialize the response and wait for that promie
        // just need to check that the response we got back is 204 - No Content and we can delete it on the front end
        if(data.status === 204) {
            // remove item from table
            removeItemFromTable(item);

            // resetting all forms
            resetAllForms();
        }
    })
    .catch((error) => {
        console.error(error);   
    })

});

function removeItemFromTable(item) {

    // removing the <tr> from the table when a item gets deleted
    const element = document.getElementById('TR' + item.id);
    element.remove();
}


//Scripting for Tabs in HTML

function openPage(evt, pageName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";
  } 

