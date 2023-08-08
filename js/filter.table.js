let snacks = [];
let url = "./js/filtertable.json";

fetch(url)
  // get the JSON data
  .then((res) => {
    res
      .json()
      // display the JSON data
      .then((data) => {
        snacks = data["snacks_data"];
        getTabledata(snacks);
        //   console.log('JSON data', snacks);
      });
  });

// Function to append data inside table
function getTabledata(data) {
  let ele = "";
  data.forEach((itemname, idx) => {
    let icon = "";
    if (itemname.children.length > 0 && itemname.expanded == false) {
      icon = '<i class="fa fa-plus"></i>';
    }
    if (itemname.children.length > 0 && itemname.expanded == true) {
      icon = '<i class="fa fa-minus"></i>';
    }
    // console.log("Parent Item", itemname.isChecked)
    ele +=
      `<tr>
          <td><input class="checkboxField" id="checkboxParent" onclick="checkUncheckParent('${itemname.id}')" type="checkbox" name="chkItems" value=${itemname.isChecked} ${
        itemname.isChecked ? "checked" : ""} id="checkBox"><label></label></td>
          <td class="left"><span id="collapseIcon" onclick="expandTree('${itemname.id}')">` + icon +`</span>${itemname.name}</td>
          <td>${itemname.ordernumber}</td>
          <td>${itemname.orederquanity}</td>
          <td>${itemname.orderprice}</td>
          <td>${itemname.GST}</td>
          <td>${itemname.totalprice}</td>
          <td><a id='btnSave' onclick='saveRecords(${itemname.id})'><i class="fa-solid fa-floppy-disk fa-fw"></i></a></td>
        </tr>`;

    if (itemname.children.length > 0 && itemname.expanded) {
      // console.log('expended', itemname.expanded)
      // console.log("Child Item", itemname.children)
      itemname.children.forEach((childitem, chilidx) => {
        ele += `<tr>`;
        if (childitem.isChecked)
          ele += `<td class="childcheckbox"> <input name="chkItems" class="checkboxField" onclick="checkUnCheckChild(${itemname.id},${childitem.id});" checked  type="checkbox" id="checkBoxchild" value=${childitem.isChecked}><label></label></td>`;
        else
          ele += `<td class="childcheckbox"> <input name="chkItems" class="checkboxField" onclick="checkUnCheckChild(${itemname.id},${childitem.id});" type="checkbox" id="checkBoxchild" value=${childitem.isChecked}><label></label></td>`;

        ele += `<td class="left color-yellow">${childitem.name}</td>
          <td contenteditable='true'>${childitem.ordernumber}</td>
          <td contenteditable='true'>${childitem.quanity}</td>
          <td contenteditable='true'>${childitem.orderprice}</td>
          <td></td>
          <td></td>
          <td><a id='btnSave' onclick="deleteChildFromLocalStorage(${itemname.id},${childitem.id});"><i class="fa-solid fa-trash fa-fw"></i></a></td>
          </tr>`;
      });
    }
  });

  outputTable.innerHTML = ele;
}
getTabledata(snacks);

// Function expand/collapse parent tree
function expandTree(expandId) {
  // 1. Find out object matching id from filterable.json
  // 2. update that json object if found
  var foundItem = snacks.find((o) => o.id == expandId);
  // alert('found expand', foundItem)
  foundItem.expanded = !foundItem.expanded;
  getTabledata(snacks);
  // console.log('final data', snacks)
}

function checkAll(checked){
  // console.log('checked', checked)
  snacks.forEach((snack)=> {
    snack.isChecked = checked;
    checkAllChildren(snack.children, checked);
  })
}

function checkAllChildren(children, checked){
  children.forEach((child)=> {
    child.isChecked = checked;
  });
}



// FUnction to check/uncheck all checkboxes
function checkUncheckAll(box) {
  checkAll(box.checked);
  // for(var i = 0; i<snacks.length; i++) {
  //   var selectAll = snacks[i];
  //   // console.log('selectAll', selectAll)
  //   for(var j = 0; j < selectAll.children.length; j++) {
  //     var checkChildd = selectAll.children[j];
  //   // console.log('child item', checkChildd)
  //   if(box.checked =! checkChildd.isChecked) {
  //     checkChildd.isChecked = !checkChildd.isChecked;
  //   }
  //   }
  //   if(box.checked =!selectAll.isChecked) {
  //     selectAll.isChecked = !selectAll.isChecked;
  //   }
  // // debugger;
  // }
  getTabledata(snacks);
}

function checkUncheckParent(parentid, childId) {
  var foundItemname = snacks.find((n) => n.id == parentid);
  console.log('parent / child id', parentid, childId)
  // foundItemname.expanded = !foundItemname.expanded;
  foundItemname.isChecked = !foundItemname.isChecked;
  console.log('parent item found', foundItemname)

  for(var i = 0; i<foundItemname.children.length; i++){
    console.log('child loop found', foundItemname.children.length)
    var checkChild = foundItemname.children[i];
    console.log('child item', checkChild)
    if(childId){
      if(childId === checkChild.id){
        if(parentid) {
          foundItemname.isChecked = !checkChild.isChecked;
        }
        checkChild.isChecked = !checkChild.isChecked;
      }
    }else {
      
      checkChild.isChecked = !checkChild.isChecked;
    }
  }
  // debugger;
  getTabledata(snacks);
}

function checkUnCheckChild(parentId, childId) {
  checkUncheckParent(parentId,childId)
}  

let foundsaveItem = [];  // Global array
 // Check Duplicate Data inside array 
 function checkDuplicate(checkvalue) {
  console.log('check', checkvalue);
 // console.log('price', priceField)
   for(let i = 0; i < foundsaveItem.length; i++) {
     if (foundsaveItem[i].id === checkvalue) {
       foundsaveItem[i].id = +foundsaveItem[i].id;
       // fruits[i].price = checkvalue;
       return false;
     }
   }
   return true
 }
 
//Function for save records to local storage
 function saveRecords(saveitemId) {
  console.log('save', saveitemId);

  let item = snacks.find((n) => n.id == saveitemId);
  // console.log('cart', cart)
  if(checkDuplicate(saveitemId)) {
    foundsaveItem.push(item);
  }
  // let newArray = [].concat(foundsaveItem, item);
  console.log('save', foundsaveItem);
  let snackItem_serialized = JSON.stringify(foundsaveItem);
  // console.log(snackItem_serialized);
  localStorage.setItem('snackss', snackItem_serialized);
  // console.log(localStorage);
  console.log('final records', foundsaveItem);
  // getTabledata(snacks);
 }

 // save data inside array not update


 //Function for delete records from local storage
 function deleteChildFromLocalStorage(deleteparentId, deletechildId){
  // console.log('save', deleteparentId);
  // 1. Find object from local storage using parentId
  var snacksItem_deserialized = JSON.parse(localStorage.getItem("snackss"));
  console.log('snacksItem_deserialized', snacksItem_deserialized);
  
  let test = [];
  console.log('test', test);
  var founddeleteItemname = snacks.find((n) => n.id == deleteparentId);
  test.push(founddeleteItemname);
  console.log('parent / child id', deleteparentId, deletechildId)
  console.log('parent item found', founddeleteItemname)
  // debugger;

  // 2. Find child object from the parent object.
  var foundchildItem = founddeleteItemname.children.find((n) => n.id == deletechildId)
  console.log('yes child item found', foundchildItem)
  if(deletechildId === foundchildItem.id){
  // 3. Delete that using splice  
    var spliced = founddeleteItemname.children.splice(foundchildItem, 1);
    console.log('yes deleted', spliced, founddeleteItemname)
  }

  // 4. Update local storage with that object. 
  // Save back to localStorage
  let itemName = [founddeleteItemname];

  // Merging two array old one and updated one and filter out only the unique items in the final array using the filter() method.
  let mergeArray =  itemName.concat(foundsaveItem.filter((item) => itemName.indexOf(item) < 0));
  localStorage.setItem('snackss', JSON.stringify(mergeArray));
  console.log('object', mergeArray)
  getTabledata(snacks); 

}
