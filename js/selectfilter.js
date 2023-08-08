let fruits = [ 
    {
      name: "banana",
      valuename: "banana",
      price: 70
    },
    {
      name: "apple",
      valuename: "apple",
      price: 100
    },
    {
      name: "orange",
      valuename: "orange",
      price: 60
    },
    {
      name: "kiwi",
      valuename: "kiwi",
      price: 80
    },
    {
      name: "water melon",
      valuename: "water melon",
      price: 120
    }
  ];
  let userCart = [];
  console.log('usercarttttt', userCart)
  // Show data in select field
  function populateSelect(data) {
  let ele = '<option selected="true" disabled>Choose Fruit Name</option>';
  data.forEach((user,idx) => {
      ele += `<option dataprice="${user.price}" value="${user.valuename}">${user.name}</option>`
  })
  fruitDropdown.innerHTML = ele;
  }
  populateSelect(fruits);
  
   // Check Duplicate Data inside array 
  function checkDuplicate(checkvalue) {
   console.log('check', checkvalue);
  //  let price = +document.getElementById("priceField").value;
  // var price = document.getElementsByTagName(element_type);
  // console.log('price', priceField)
    for(let i = 0; i < userCart.length; i++) {
      if (userCart[i].name === checkvalue) {
        // console.log('true/false', userCart[i].name === checkvalue)
        userCart[i].quantity = +quantity.value + +userCart[i].quantity;
        // fruits[i].price = checkvalue;
        return false;
      }
    }
    return true
  }
  
  // Function for push final data from select field to html table
  function getOption() {
      let quantity = document.getElementById("quantity").value;
      // let price = +document.getElementById("priceField").value;
      let selectElement = document.querySelector('#fruitDropdown').value;
      var selection = document.getElementById("fruitDropdown");
      var price = selection.options[selection.selectedIndex].getAttribute('dataprice')
  
      // console.log('option', option)
      console.log('selectitem', selectElement)
      let fruitsObj = {
        name : selectElement,
        quantity: quantity,
        price: price
      };
      // console.log('fruits', fruitsObj);
      if(checkDuplicate(selectElement)){
        userCart.push(fruitsObj);
        console.log('usercart', fruitsObj);
      }
  
      filterTable(userCart);
      // console.log('update', userCart)
  }
  
  // Fucntion for render HTML data in UI
  function filterTable(data) {
    let ele = '';
    data.forEach((fruitn, indexid) => {
        ele += `<tr>
        <td>${indexid+1}</td>
        <td id="productName_${indexid}">${fruitn.name.toUpperCase()}</td> 
        <td class="bttnQuantity">
        <button onclick="decrement(${indexid})">-</button>
        <span class="counting" id="quantity_${indexid}">${fruitn.quantity}</span>
        <button onclick="increment(${indexid})">+</button>
        </td>
        <td id="price_${indexid}">${fruitn.price}</td>
        <td id="total${indexid}">${fruitn.quantity*fruitn.price}</td>
        <td><button class='btnDelete' id='btnDelete' onclick="removeItem(${indexid})">Delete</button></td>
        </tr>`;
    })
    outputTable.innerHTML = ele;
  }
  
  // function to remove/delete data from html table and json
  function removeItem(indexValue) {
    userCart.splice(indexValue, 1);
    // console.log('final value', indexValue, userCart);
    filterTable(userCart);
  }
  
  //Creation of increment quantity function
  function increment(target) {
    if(userCart[target].quantity < 10) {
      userCart[target].quantity = +userCart[target].quantity + 1;
      console.log('increament', userCart[target].quantity)
      // console.log(+userCart[target].quantity)
      filterTable(userCart)
    }
  }
  //creation of decrement quantity function
  function decrement(minus) {
    if(userCart[minus].quantity > 1) {
      userCart[minus].quantity = +userCart[minus].quantity - 1
      filterTable(userCart)
    }
  }
  // hide show toggle button 
  $("button.addeNewItem").click(function(){
    $(".inputDataField").toggle();
  });
  
  // Show data in list
  function showData(data) {
    let ele = '';
    data.forEach((user,idx) => {
        ele += `<li id="listData${user.name}" price-update="${user.price}" value="${user.name}" class="list fname_${user.name}">${user.name}
          <span contenteditable='true' id="pricEdit_${user.name}">${user.price}</span>
          <div id='btnSave' class="savePrice_btn" onclick="saveItem('${user.name}')">Save</div></li>`
    })
    fruitDataList.innerHTML = ele;
    }
    showData(fruits);
  
   // Check Duplicate Data inside array 
   function checkDuplicateFruits(checkname) {
    // console.log('check', checkname);
     for(let i = 0; i < fruits.length; i++) {
      // console.log('check', checkname);
       if (fruits[i].name === checkname) {
        // fruits[i].price = checkname;
        // console.log('check', fruits[i].name === checkname);
         return false;
       }
     }
     return true
   }
  
  // Add item to data list and select list function  
  function addItem(ids) {
    let newFruit = document.getElementById("addlist").value;
    let priceUpdate = +document.getElementById("priceField").value;
    console.log('inputfield', newFruit)
    let fruitsObjList = {
      // id: ids,
      name : newFruit, 
      valuename: newFruit,
      price:priceUpdate
    }
    console.log('new fruits', fruitsObjList);
    // console.log('push list data', fruits.push(fruitsObjList));
    if(checkDuplicateFruits(newFruit)){
      fruits.push(fruitsObjList)
    }
    showData(fruits);
    populateSelect(fruits);
    // saveItem(fruits);
    console.log('final data', fruits)
  }
  
  // function for save button
  function saveItem(itemKey) {
    // let priceValue = document.getElementById('pricEdit_'+itemKey).innerHTML;
    console.log('itemKey', itemKey);
      for (var i = 0; i < fruits.length; i++) {
      if (fruits[i].name === itemKey) {
        //  fruits[i].price = price.value
        fruits[i].price = $('#pricEdit_'+itemKey).html();
        // console.log('fruit id', fruits[i].name)
        // console.log('fruits price', fruits[i].price = $('#pricEdit_'+itemKey).html());
      }
    }
    for (var i = 0; i < userCart.length; i++) {
      if (userCart[i].name === itemKey) {
          // userCart[i].price = price.value
        userCart[i].price = $('#pricEdit_'+itemKey).html()
        // console.log('usercart id', userCart[i].name)
        // console.log('fruits price', fruits[i].price = $('#pricEdit_'+itemKey).html());
      }
    }
    // filterTable(userCart);
    populateSelect(fruits);
    filterTable(userCart);
  
    console.log('table-data', fruits)
    console.log('usercart-data', userCart)
  return;
  }