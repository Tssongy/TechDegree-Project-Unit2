/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
  Create Global variables and set up their properties and relationships between them.
***/
const listItem = document.getElementsByClassName("student-item cf");
const itemsPerPage = 10;
const div = document.getElementsByClassName('page-header')[0];
const divSearch = document.createElement('div');
const message = document.createElement('h3');
const divPagination = document.createElement('div');
const divPage = document.getElementsByClassName('page')[0];
const ul = document.createElement('ul');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
const names = document.getElementsByClassName('student-list')[0].getElementsByTagName('h3');
var searchResult = [];

searchInput.setAttribute('placeholder', 'Search for students...');
searchButton.textContent = 'Search';
divPagination.appendChild(ul);
divSearch.setAttribute('class', 'student-search');
divSearch.appendChild(searchInput);
divSearch.appendChild(searchButton);
divSearch.appendChild(message);
message.style.display = 'none';
div.appendChild(divSearch);

   
   

// Displays the list of students that match the search result. A message appears if there is no match
function searchKey(){
   message.textContent = 'No results found';
   message.style.color = 'red';
   message.style.paddingTop = '8px';
   
   var key = searchInput.value;
   searchResult = [];
   for(let i =0; i<names.length; i++){
      if(names[i].textContent.match(key.toLowerCase())){
         searchResult.push(names[i].parentNode.parentNode);
      }
      else{
         names[i].parentNode.parentNode.style.display = 'none';
      }

   }
   if(searchResult.length === 0){
      message.style.display = '';
   }
   else{
      message.style.display = 'none';
   }
   appendPageLinks(searchResult);
   showPage(searchResult,1);

} 




/*** 
   This function selects a maximum of 10 students according to the list array and page number
   and display them.
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



/*** 
   Generate, append, and add functionality to the pagination buttons.
***/

function appendPageLinks(list){
   divPagination.setAttribute('class', 'pagination');
   divPage.appendChild(divPagination);

   // remove all 'li' appended to ul
   while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
   }
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


// Add functionality to page links
function createLinks(e){
   const aArray = ul.getElementsByTagName('a');
   for(let i = 0; i<aArray.length; i++){
      aArray[i].className = '';
   }
   e.target.className = 'active';
   showPage(searchResult, e.target.textContent);
}

/// Initialize the pagination with 54 students and add eventlistener to the search input
function init(){
   showPage(listItem,1);
   appendPageLinks(listItem);
   searchResult = listItem;
   searchInput.addEventListener('keyup', searchKey);
   ul.addEventListener('click', createLinks);
}

// Call to initialise the pagination
init();