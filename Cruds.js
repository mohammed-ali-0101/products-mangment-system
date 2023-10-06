let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("submit");
let mod="create"
let tmp

//start function to get total
function getTotal(){
    if(price.value!=""){
    let result= (+price.value + +taxes.value + +ads.value)- +discount.value
    total.innerHTML=result
    total.style.backgroundColor="#040"
   }
   else{
    total.innerHTML=""
     total.style.backgroundColor="#a00d02"
   }
}
//end function to get total

//start create products
let dataPro;
if(localStorage.product!=null){
    dataPro=JSON.parse(localStorage.product) 
}else{
     dataPro=[]
}
submit.onclick=function(){
  
 let newPro={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
 } 
 if(title.value!="" && price.value!="" && category.value!="" && newPro.count<100){
        if(mod==="create"){
            if(newPro.count>1){
                for(let i=0;i<newPro.count;i++){
                    dataPro.push(newPro)
                }
            }else{
                dataPro.push(newPro)
            }
        }else{
            dataPro[tmp]=newPro
            count.style.display="block"
            submit.innerHTML="Create"
         }

       clearDta()
    }



localStorage.setItem("product" , JSON.stringify(dataPro))


showData()
}
//end create products

//star clear data from inputs after creat products
function clearDta(){
        title.value=""
        price.value=""
        taxes.value=""
        ads.value=""
        discount.value=""
        total.innerHTML=""
        count.value=""
        category.value=""
       
    
}
//end clear data from inputs after creat products

// start read Data
function showData(){
    getTotal()
    let table=""
    for(let i=0; i<dataPro.length;i++ ){
         table+=`
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id=update>update</button></td>
            <td><button onclick="deletePro(${i})" id=delete>delete</button></td>

        </tr> 
    `
    }
    document.getElementById("tbody").innerHTML=table
    let deleteAll=document.getElementById("deleteAll")
    if(dataPro.length>0){
        deleteAll.innerHTML=`
        <button onclick=" deletAllPro()">delete All (${dataPro.length})</button>
        `
    }else{
        deleteAll.innerHTML=""
    }
    
}
// to show data in table when reload page 
showData()
// end read Data

//start delet prodect
function deletePro(i){
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}
//end delet prodect

//start function to delete All
function deletAllPro(){
    localStorage.clear()
      dataPro.splice(0)
    showData()
}
//start function to delete All

//start function to update data
function updateData(i){
title.value=dataPro[i].title;
price.value=dataPro[i].price;
taxes.value=dataPro[i].taxes;
ads.value=dataPro[i].ads;
discount.value=dataPro[i].discount;
getTotal()
count.style.display="none"
category.value=dataPro[i].category;
submit.innerHTML="Update"
mod="update"
tmp=i
scroll({
    top:0,
    behavior:"smooth"
})
}
//end function to update data


// start function  to search
let searchMod="title"
function getSearchMod(id){
    let search=document.getElementById("search")
    if(id==="searchTitle"){
        searchMod="title"
        search.placeholder="Search By Title"
    }else{
        searchMod="category"
        search.placeholder="Search By category"
    }
    search.focus()
    search.value=""
    showData()
}
function searchDtat(value){
    let table=""
    if(searchMod==="title"){
      for(let i=0;i<dataPro.length;i++){
          if(dataPro[i].title.includes(value.toLowerCase())){
                table+=`
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id=update>update</button></td>
                <td><button onclick="deletePro(${i})" id=delete>delete</button></td>

            </tr> 
          `   
          }
        }
    }else{
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                  table+=`
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id=update>update</button></td>
                    <td><button onclick="deletePro(${i})" id=delete>delete</button></td>
                </tr> `   
            }
        } 
    }
    document.getElementById("tbody").innerHTML=table
}
// end function  to search
