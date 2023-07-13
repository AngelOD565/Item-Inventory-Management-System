/**
 * here is the javascript for index.html for the items API and warehouses API
 */


const URL = 'http://localhost:8282/items';
const WURL= 'http://localhost:8282/warehouses';
let allItems = [];
let allWarehouses = [];

/**
 * document - gives access to html elements
 * 
 * event listeners are how we respond to events in the html
 * 
 */
document.addEventListener('DOMContentLoaded', () => {                                                       //Listener for items
  
    let xhr = new XMLHttpRequest();         // creating a new XHR object 

    xhr.onreadystatechange = () => {
         
        if(xhr.readyState === 4) {

            // responseText contains the response from the server
            // JSON.parse() parses the JSON into js objects
            let items = JSON.parse(xhr.responseText);

            // add items to table
            items.forEach(newItem => {
                addItemToTable(newItem);
            });

        }

    };

    xhr.open('GET', URL);
    

    // this sends the request 
    xhr.send();

 

});

document.addEventListener('DOMContentLoaded', () => {                                              //Listener for warehouses

    let xhr = new XMLHttpRequest();         

    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4) {
    
            let warehouses = JSON.parse(xhr.responseText);

            // add warehouses to table
            warehouses.forEach(newWarehouse => {
                addWarehouseToTable(newWarehouse);
            });

        }

    };

    xhr.open('GET', WURL);
    
    xhr.send();

 

});



////////////////////////////////////////////
///// POST REQUEST AND ADDING TO TABLE /////
////////////////////////////////////////////

document.getElementById('new-item-form').addEventListener('submit', (event) => {

    // event object gives info about the event that we are listening for
    event.preventDefault();         //preventDefault() is going to prevent the form from refreshing the page 


    // FormData takes in the html tags for our form
    let inputData = new FormData(document.getElementById('new-item-form'));

    let newItem = {
        // use .get() to retrieve a field from form data and pass in the NAME attribute from the <input> tag
        name : inputData.get('new-item-name'),         
        rarity : inputData.get('new-item-rarity'),
        warehouse : {
            id : inputData.get('new-warehouse-id'),
            warehouseName : inputData.get('new-warehouse-name')}
        

    }

    doItemPostRequest(newItem);

});

document.getElementById('new-warehouse-form').addEventListener('submit', (event) => {

    event.preventDefault();         

    let inputData = new FormData(document.getElementById('new-warehouse-form'));

    let newWarehouse = {
        
            id : inputData.get('new-warehouse-id'),
            warehouseName : inputData.get('new-warehouse-name')
        

    };

    doWarehousePostRequest(newWarehouse);

});

async function doItemPostRequest(newItem) {

    let returnedData = await fetch(URL + '/item', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'         
        },
        body : JSON.stringify(newItem)      // turns a js object into JSON
    });

    // .json() to deserialize the JSON back into js object - this ALSO returns a promise
    let itemJson = await returnedData.json();

    console.log('ITEM JSON' + itemJson);

    // just need to add item to table
    addItemToTable(itemJson);

    // reset the form
    document.getElementById('new-item-form').reset();
}

async function doWarehousePostRequest(newWarehouse) {

    let returnedData = await fetch(WURL + '/warehouse', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'         
        },
        body : JSON.stringify(newWarehouse)      // turns a js object into JSON
    });

    // .json() to deserialize the JSON back into js object - this ALSO returns a promise
    let warehouseJson = await returnedData.json();

    console.log('WAREHOUSE JSON' + warehouseJson);

    // just need to add warehouse to table
    addWarehouseToTable(warehouseJson);

    // reset the form
    document.getElementById('new-warehouse-form').reset();
}

function addItemToTable(newItem) {

    // DOM Manipulation - where we manually change the DOM

    // creting all necessary DOM elements
    let tr = document.createElement('tr');      // will create a <tr> tag
    let id = document.createElement('td');      // will create a <td> tag for item id
    let name = document.createElement('td');      // will create a <td> tag for item name
    let rarity = document.createElement('td');      // will create a <td> tag for item rarity
    let warehouse = document.createElement('td');      // will create a <td> tag for warehouse
    let editBtn = document.createElement('td');      // will create a <td> tag for edit button
    let deleteBtn = document.createElement('td');      // will create a <td> tag for delete button

    id.innerText = newItem.id;
    name.innerText = newItem.name;
    rarity.innerText = newItem.rarity;
    warehouse.innerText = newItem.warehouse.warehouseName + ' ' + newItem.warehouse.id;
    

    editBtn.innerHTML = 
    `<button class="btn btn-primary" id="edit-button" onclick="activateItemEditForm(${newItem.id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-button" onclick="activateItemDeleteForm(${newItem.id})">Delete</button>`;

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



function addWarehouseToTable(newWarehouse) {

    // creting all necessary DOM elements
    let tr = document.createElement('tr');      // will create a <tr> tag
    let id = document.createElement('td');      // will create a <td> tag for warehouse id
    let warehouse = document.createElement('td');      // will create a <td> tag for warehouse
    let editBtn = document.createElement('td');      // will create a <td> tag for edit button
    let deleteBtn = document.createElement('td');      // will create a <td> tag for delete button

    id.innerText = newWarehouse.id;
    warehouse.innerText = newWarehouse.warehouseName
    

    editBtn.innerHTML = 
    `<button class="btn btn-primary" id="edit-button" onclick="activateWarehouseEditForm(${newWarehouse.id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-button" onclick="activateWarehouseDeleteForm(${newWarehouse.id})">Delete</button>`;

    // adds the <td> tags as nested children to the tr> tag
    tr.appendChild(id);
    tr.appendChild(warehouse);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    // setting the idattribute for the <tr>
    tr.setAttribute('id', 'TR' + newWarehouse.id);

    // adds the <tr> tag to the <tbody> tag
    document.getElementById('warehouse-table-body').appendChild(tr);

    // adding the new warehouse to the list of all the warehouses
    allWarehouses.push(newWarehouse);

}




///////////////////////////////////////////
///// CANCEL BUTTONS AND FORM TOGGLES /////
///////////////////////////////////////////

document.getElementById('update-cancel-button').addEventListener('click', (event) => {      //Cancel Button for Edit Item 
    event.preventDefault();
    resetAllItemForms();
});

document.getElementById('delete-cancel-button').addEventListener('click', (event) => {      //Cancel Button for Delete Item 
    event.preventDefault();
    resetAllItemForms();
    
});

    document.getElementById('update-wcancel-button').addEventListener('click', (event) => {   //Cancel Button for Edit Warehouse 
    event.preventDefault();
    resetAllWarehouseForms();
});

document.getElementById('delete-wcancel-button').addEventListener('click', (event) => {      //Cancel Button for Delete Warehouse 
    event.preventDefault();
    resetAllWarehouseForms();
    
});

function resetAllItemForms() {

    // clears data from all forms
    document.getElementById('new-item-form').reset();
    document.getElementById('update-item-form').reset();
    document.getElementById('delete-item-form').reset();


    // displays only the new-item-form
    document.getElementById('new-item-form').style.display = 'block';
    document.getElementById('update-item-form').style.display = 'none';
    document.getElementById('delete-item-form').style.display = 'none'; 

}

function resetAllWarehouseForms() {

    // clears data from all forms
    document.getElementById('new-warehouse-form').reset();
    document.getElementById('update-warehouse-form').reset();
    document.getElementById('delete-warehouse-form').reset();


    // dispalys only the new-warehouse-form
    document.getElementById('new-warehouse-form').style.display = 'block';
    document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'none'; 

}

function activateItemEditForm(itemId) {
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

function activateWarehouseEditForm(warehouseId) {
    // find the item and its <tr> that needs to be edited
    for(let w of allWarehouses) {
        if(w.id === warehouseId) {
            document.getElementById('update-warehouse-id').value = w.id;
            document.getElementById('update-warehouse-name').value = w.warehouseName;
        }
    }

    // showing only the edit form
    document.getElementById('new-warehouse-form').style.display = 'none';
    document.getElementById('update-warehouse-form').style.display = 'block';   // block is the default for showing a tag
    document.getElementById('delete-warehouse-form').style.display = 'none';

}



function activateItemDeleteForm(itemId) {
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

    // showing only the delete form
    document.getElementById('new-item-form').style.display = 'none';
    document.getElementById('update-item-form').style.display = 'none';
    document.getElementById('delete-item-form').style.display = 'block';   // block is the default for showing a tag
    
}

function activateWarehouseDeleteForm(warehouseId) {
    // find the item and its <tr> that needs to be edited
    for(let w of allWarehouses) {
        if(w.id === warehouseId) {
            document.getElementById('delete-warehouse-id').value = w.id;
            document.getElementById('delete-warehouse-name').value = w.warehouseName;
        }
    }

    // showing only the delete form
    document.getElementById('new-warehouse-form').style.display = 'none';
    document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'block';   // block is the default for showing a tag
    
}


/////////////////////////////////////////////////
///// UPDATE REQUEST AND CHANGING THE TABLE /////
/////////////////////////////////////////////////

document.getElementById('update-item-form').addEventListener('submit', (event) => {         //Listener for Item edit
    event.preventDefault();		// prevent default form actions from occuring

    // retrieving data from the update form
    let inputData = new FormData(document.getElementById('update-item-form'));

    let item = {
        id : document.getElementById('update-item-id').value,    // FormData cannot access values from disabled fields
        name : inputData.get('update-item-name'),         
        rarity : inputData.get('update-item-rarity'),
        warehouse : {
            id : document.getElementById('update-warehouse-id').value,
            warehouseName : inputData.get('update-warehouse-name')
        }
    }

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

        console.error(error); 
    })
});

function updateItemInTable(item) {
    document.getElementById('TR' + item.id).innerHTML = `
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.rarity}</td>
    <td>${item.warehouse.warehouseName}</td>
    <td><button class="btn btn-primary" id=editButton" onclick="activateItemEditForm(${item.id})">Edit</button></td>
    <td><button class="btn btn-primary" id=deleteButton" onclick="activateItemDeleteForm(${item.id})">Delete</button></td>
    `;
}


document.getElementById('update-warehouse-form').addEventListener('submit', (event) => {            //Listener for warehouse edit
    event.preventDefault();		

    let inputData = new FormData(document.getElementById('update-warehouse-form'));

    // MAKE SURE TO INCLUDE IDS WHEN DOING A PUT REQUEST
    let warehouse = {
        id : document.getElementById('update-warehouse-id').value,
        warehouseName : inputData.get('update-warehouse-name')
    }

    fetch(WURL + '/warehouse', {
        method : 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(warehouse)
    })
    .then((data) => {
        // this will handle all 100, 200, and 300 status code responses
        
        // we still need to serialize the response into JSON
        return data.json();
    })
    .then((warehouseJson) => {          // handling the promise returned by data.json (*** this is where we update the table ***)
        
        // adding the updated warehouse to our table
        updateWarehouseInTable(warehouseJson);

        // reset the forms
        document.getElementById('update-warehouse-form').reset();
        document.getElementById('new-warehouse-form').style.display = 'block';
        document.getElementById('update-warehouse-form').style.display = 'none';
    })
    .catch((error) => {
        

        console.error(error);   
    })
});



function updateWarehouseInTable(warehouse) {
    document.getElementById('TR' + warehouse.id).innerHTML = `
    <td>${warehouse.id}</td>
    <td>${warehouse.warehouseName}</td>
    <td><button class="btn btn-primary" id=editButton" onclick="activateWarehouseEditForm(${warehouse.id})">Edit</button></td>
    <td><button class="btn btn-primary" id=deleteButton" onclick="activateWarehouseDeleteForm(${warehouse.id})">Delete</button></td>
    `;
}


//////////////////////////////////////////////////
///// DELETE REQUEST AND REMOVING FROM TABLE /////
//////////////////////////////////////////////////

document.getElementById('delete-item-form').addEventListener('submit', (event) => {         //Listener for Delete item
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
            resetAllItemForms();
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

document.getElementById('delete-warehouse-form').addEventListener('submit', (event) => {         //Listener for Delete warehouse
    event.preventDefault();		// prevent default form actions from occuring


    // get the data from the form since all the fields are disabled and FormData won't capture them

    let warehouseId = document.getElementById('delete-warehouse-id').value;
    let warehouseName = document.getElementById('delete-warehouse-name').value;

    // creating the warehouse object that needs to be deleted
    let warehouse = {
            id : warehouseId,
            warehouseName : warehouseName
        }
    

    // sending delete request
    fetch(WURL + '/warehouse', {
        method : 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(warehouse)
    })
    .then((data) => {

        // delete request returns no-content so there's no need to deserialize the response and wait for that promise
        // just need to check that the response we got back is 204 - No Content and we can delete it on the front end
        if(data.status === 204) {
            // remove warehouse from table
            removeWarehouseFromTable(warehouse);

            // resetting all forms
            resetAllWarehouseForms();
        }
    })
    .catch((error) => {
        console.error(error);   
    })

});

function removeWarehouseFromTable(warehouse) {

    // removing the <tr> from the table when a warehouse gets deleted
    const element = document.getElementById('TR' + warehouse.id);
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

