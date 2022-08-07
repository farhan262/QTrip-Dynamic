import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  //console.log(search);
  // let cityName=  search.replace("?city=",""); 
  // console.log(cityName)
  return search.replace("?city=",""); 


}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
   //let cityName = getCityFromURL(search);
   //console.log(cityName)
   let advData = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
   let finalAdvData = await advData.json();
   //console.log(finalAdvData);
   return finalAdvData
  }
  catch(err){
     return null
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures){
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(ele => {
    //console.log(ele.id);
    createCard(ele.id, ele.category, ele.image, ele.name, ele.costPerHead, ele.duration);
    
  });
  //console.log(createCard);
}

function createCard(id, category, image,name, costPerHead, duration){
 let cardDiv = document.getElementById("data");
 //console.log(cardDiv)
 let childDiv = document.createElement("div");
 childDiv.className = "col-6 col-lg-3 mb-3";
 childDiv.innerHTML = `<a href="detail/?adventure=${id}" id="${id}">   
                        <div class="activity-card">
                             <div class="activity-card-image"> <img src="${image}" class="img-fluid"/> </div>
                              <div class="category-banner"><div>${category}</div></div>
                              
                              <div class="d-flex justify-content-between activity-card-text p-2 pb-1">
                                         <div><b>${name}</b></div>
                                         <div><b>&#8377;${costPerHead}</b></div>
                              </div>
                              <div class="d-flex justify-content-between activity-card-text p-2 pt-1">
                                    <div><b>Duration</b></div>
                                    <div><b>${duration} Hours</b></div>
                              </div>
                               
                            
                          </div>
                       </a>`;
cardDiv.append(childDiv);
//console.log("from card div", cardDiv);
return cardDiv
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
let filteredList=[];
list.map(adv =>{
  if(adv.duration>= low && adv.duration<= high){
    filteredList.push(adv);
  }
});
if(filteredList.length===0){
  return list;
  
}
return filteredList;

}


//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
var filteredadvByCategory =[];
categoryList.map((category) =>{
  list.map((key) =>{
    if(key.category===category){
      filteredadvByCategory.push(key);
    }
  });
});
if(categoryList.length===0){
  return list;
}
 return filteredadvByCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters["duration"].length > 0 && filters["category"].length > 0) {
    let range = filters["duration"];
    let rangeArray = range.split("-");
    let filterByDurationList = filterByDuration(list, rangeArray[0], rangeArray[1]);
    var finalList = filterByCategory(filterByDurationList, filters["category"]);
  }
  else if(filters["duration"].length > 0){
    let range = filters["duration"];
    let rangeArray = range.split("-");
    var finalList = filterByDuration(list, rangeArray[0], rangeArray[1]);
  }
  else if(filters["category"].length > 0) {
    var finalList = filterByCategory(list, filters["category"]);
  }
  else {
    return list;
  }
  
  return finalList;
}


  // Place holder for functionality to work in the Stubs



//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let localStorageFilter = JSON.parse(window.localStorage.getItem("filters"));

  
  return localStorageFilter;

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  filters["category"].map(key => {
    let divElementPills = document.createElement("div");
    divElementPills.className = "category-filter";
    divElementPills.innerHTML = `
      <div>${key}</div>
    `;
    document.getElementById("category-list").appendChild(divElementPills);
  })

  if(filters["duration"]) {
  document.getElementById("duration-select").value=filters["duration"];
  }
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
