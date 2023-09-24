import createDays from "./calendar.js";

let itemExists = localStorage.getItem("days") !== null;
let days = [];

//Sync local days with local storage if it exists
if (localStorage.getItem("days")) {
  days = JSON.parse(localStorage.getItem("days"));
  createDays(days.length);
}

function updtStorage() {
  localStorage.setItem("days", JSON.stringify(days));
}

export function getStorage() {
  if (itemExists == true) {
    const days = JSON.parse(localStorage.getItem("days"));
    console.dir(days);
  }
}

//Constructor
function Day() {
  this.habitOne = false;
  this.habitTwo = false;
  this.habitThree = false;
}

export function makeDays(number) {
  for (let i = 0; i < number; i++) {
    const day = new Day();
    days.push(day);
  }
  updtStorage();
  createDays(number);

  return days;
}
//If it doesn't exist, create a new one
itemExists == false ? (days = makeDays(365)) : console.log("");

//Change habit status
export function changeStatus(index, habit) {
  switch (habit) {
    case "habit-one":
      days[index].habitOne = !days[index].habitOne;
      break;
    case "habit-two":
      days[index].habitTwo = !days[index].habitTwo;
      break;
    case "habit-three":
      days[index].habitThree = !days[index].habitThree;
  }

  updtStorage();
}

export function getHabitStatus(index) {
  return [days[index].habitOne, days[index].habitTwo, days[index].habitThree];
}
