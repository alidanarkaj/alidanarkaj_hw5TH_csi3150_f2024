import { usedCars } from "./usedCars.js"; //import the car data

//display all cars initially from usedCars dataset
window.onload = () => {
  displayCars(usedCars);
};

//function to display cars
function displayCars(cars) {
  const carListings = document.getElementById("carListings");
  carListings.innerHTML = "";

  //check if the cars array is empty
  if (cars.length === 0) {
    carListings.innerHTML =
      "<p>No cars match your criteria. Please try again.</p>";
    return;
  }

  cars.forEach((car) => {
    //creates cars array to create a card for it
    const carCard = document.createElement("div");
    carCard.classList.add("car-card");
    carCard.innerHTML = `
      <img src="${car.image}" alt="${car.make} ${car.model}">
      <h3>${car.year} ${car.make} ${car.model}</h3>
      <p class="price">$${car.price}</p>
      <p>Mileage: ${car.mileage} miles</p>
      <p>Color: ${car.color}</p>
      <p>Gas Mileage: ${car.gasMileage}</p>
    `;
    carListings.appendChild(carCard); //appends each carCard to the carListings container
  });
}

//function to apply filters
function applyFilters() {
  const minYear = parseInt(document.getElementById("minYear").value) || 0;
  const maxYear = parseInt(document.getElementById("maxYear").value) || 9999;
  const make = Array.from(document.getElementById("make").selectedOptions).map(
    (option) => option.value //grabs the selected car makes as an array from the dropdown menu
  );
  const maxMileage =
    parseInt(document.getElementById("maxMileage").value) || Infinity;
  const minPrice = parseInt(document.getElementById("minPrice").value) || 0;
  const maxPrice =
    parseInt(document.getElementById("maxPrice").value) || Infinity;
  const color = Array.from(
    document.getElementById("color").selectedOptions
  ).map((option) => option.value);

  //filters the usedCars array
  const filteredCars = usedCars.filter(
    (car) =>
      car.year >= minYear &&
      car.year <= maxYear &&
      (make.length === 0 || make.includes(car.make)) &&
      car.mileage <= maxMileage &&
      car.price >= minPrice &&
      car.price <= maxPrice &&
      (color.length === 0 || color.includes(car.color))
  );

  //calls displayCars to show the filtered cars
  displayCars(filteredCars);
}

// attach the function to the global scope
window.applyFilters = applyFilters;
