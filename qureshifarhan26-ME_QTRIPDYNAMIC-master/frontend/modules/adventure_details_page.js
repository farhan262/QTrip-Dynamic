import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventureId = new URLSearchParams(search).get("adventure");
  return adventureId;

  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(config.backendEndpoint + "/adventures/detail?adventure=" + adventureId);
    const adventureData = await res.json();
    return adventureData;
    //console.log(adventureData);
  } catch(error) {
    return null;
  }
//console.log(json.data);
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  let divGallery = document.getElementById("photo-gallery");

  adventure.images.map((advImage => {
    let divImage = document.createElement("div");
    divImage.className = "col-12";
    divImage.setAttribute("id","imageGallery");
    divImage.innerHTML = `
      <img class="img-responsive activity-card-image" src=${advImage} />
    `;
    divGallery.appendChild(divImage)
  }));

  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let iCount = 0;
  let divGallery = document.getElementById("photo-gallery");
  divGallery.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></li>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></li>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></li>
    </div>

  <div class="carousel-inner col-12" id = "carousel-slides">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>

</div>
  `;

  let divCarousel = document.getElementById("carousel-slides");

  images.map((key) => {
    let divNew = document.createElement("div");
    if(iCount === 0) {
      divNew.className = "carousel-item active";
      divNew.innerHTML = `
      <img class="img-responsive activity-card-image" src="${key}" alt="First slide">
      `;
      iCount = 1;
    } else {
      divNew.className = "carousel-item";
      divNew.innerHTML = `
      <img class="img-responsive activity-card-image" src="${key}" alt="First slide">
      `;
    }
    divCarousel.appendChild(divNew);
  });

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);
  if(adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = adventure.costPerHead * persons;

  console.log("value of adventures from ui is %d", adventure.costPerHead)
  console.log("No of persons is %d",persons)
  document.getElementById("reservation-cost").innerHTML = totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 
  const formID = document.querySelector("#myForm");
  formID.addEventListener("submit",(e)=>{
    e.preventDefault();
   let data = {
    name: formID.elements['name'].value,
    date: formID.elements['date'].value,
    person:formID.elements['person'].value,
    adventure: adventure.id
  }
  sendData(data);
  })
  
}

async function sendData(data){
  try{
    let url = config.backendEndpoint + "/reservations/new";
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    let repsonse = await fetch(url, settings);
    const responsedata = await repsonse.json();
    console.log(responsedata);
    alert("Success!");
   return responsedata;
  }
  catch(error){
    console.log(error);
    alert("Failed!")
  }
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
