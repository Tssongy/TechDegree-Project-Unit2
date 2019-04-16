/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const listItem = document.getElementsByClassName("student-item cf");
const itemsPerPage = 10;

// button making
const div = document.getElementsByClassName('page-header')[0];
const divSearch = document.createElement('div');
const message = document.createElement('h2');
message.textContent = 'No results found';
var searchResult = [];

   const searchInput = document.createElement('input');
   const searchButton = document.createElement('button');
   divSearch.setAttribute('class', 'student-search');
   searchInput.setAttribute('placeholder', 'Search for students...');
   searchButton.textContent = 'Search';

   divSearch.appendChild(searchInput);
   divSearch.appendChild(searchButton);
   div.appendChild(divSearch);

   const names = document.getElementsByClassName('student-list')[0].getElementsByTagName('h3');
   

searchInput.addEventListener('keyup', () =>{
   var key = searchInput.value;
   searchResult = [];
   for(let i =0; i<names.length; i++){
      if(names[i].textContent.match(key.toLowerCase())){
         names[i].parentNode.parentNode.style.display = '';
         searchResult.push(names[i].parentNode.parentNode);
      }
      else{
         names[i].parentNode.parentNode.style.display = 'none';
      }

   }
   if(searchResult.length === 0){
      div.appendChild(message);
   }
   else{
      div.removeChild(message);
   }
   appendPageLinks(searchResult);
   showPage(searchResult,1);

} )


   
/* <div class="student-search">
          <input placeholder="Search for students...">
          <button>Search</button>
        </div> */


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage(list,page){
   const startIndex = page*itemsPerPage - itemsPerPage;
   const endIndex = page*itemsPerPage;
   for (let i = 0; i< list.length; i++){
      list[i].style.display = 'none';
      if (i >= startIndex && i < endIndex){
         list[i].style.display = '';
      }
      
   }
   
}

/// Initialize the pagination
function init(){
   showPage(listItem,1);
   appendPageLinks(listItem);
   searchResult = listItem;
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

   const divPagination = document.createElement('div');
   const divPage = document.getElementsByClassName('page')[0];
   const ul = document.createElement('ul');

function appendPageLinks(list){
   // create a div 
   
   divPagination.setAttribute('class', 'pagination');
   divPage.appendChild(divPagination);
   // remove all 'li' appended to ul
   while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
   }

   //create ul
   
   divPagination.appendChild(ul);
   for(let i = 1; i<=Math.ceil(list.length/itemsPerPage); i++){
      const li = document.createElement('li');
      const a = document.createElement('a');
      if (i === 1){
         a.setAttribute('class', 'active');
      }
      a.setAttribute('href', '#');
      a.textContent = i;

      li.appendChild(a);
      ul.appendChild(li);
   }
   

   
}

ul.addEventListener('click', (e)=>{
   const aArray = ul.getElementsByTagName('a');
   for(let i = 0; i<aArray.length; i++){
      aArray[i].className = '';
   }

   e.target.className = 'active';
   showPage(searchResult, e.target.textContent);
   console.log('hh');
})


init();
// Remember to delete the comments that came with this file, and replace them with your own code comments.