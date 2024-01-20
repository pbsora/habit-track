import { changeStatus, getHabitStatus } from "./storage.js";

import { DateTime } from "luxon";

const startDate = DateTime.fromISO("2024-01-20");

// Generate the list of dates for the next 31 days
const next31Days = Array.from({ length: 365 }, (_, index) =>
  startDate.plus({ days: index }).toFormat("yyyy-MM-dd")
);

export let newDate = [];

next31Days.forEach((date) => {
  const parsedDate = DateTime.fromISO(date);
  const formattedDate = parsedDate
    .toFormat("dd-MM-yyyy")
    .replace("-", "/")
    .slice(0, 5);
  newDate.push(formattedDate);
});
console.log(newDate);

const content = document.getElementById("content");

export default function createDays(nOfDays) {
  for (let i = 1; i <= nOfDays; i++) {
    const habitStatus = getHabitStatus(i - 1);
    const day = document.createElement("div");
    day.setAttribute("class", `day ${i}`);

    //Trigger change in habit status
    day.addEventListener("click", (e) => {
      const habit = e.target.classList.value;
      const index = e.target.parentElement.classList.value.slice(3);
      changeStatus(index - 1, e.target.classList.item(0));

      if (habit.includes("-activate")) {
        e.target.classList.remove(e.target.classList.item(1));
      } else {
        e.target.classList.add(habit + "-activate");
      }
    });

    const dayOfTheMonth = document.createElement("div");
    dayOfTheMonth.setAttribute("class", "day-of-the-month");
    const p = document.createElement("p");
    p.innerText = newDate[i - 1];
    dayOfTheMonth.appendChild(p);
    day.appendChild(dayOfTheMonth);

    const habitOne = document.createElement("div");
    const svg = document.createElement("img");
    svg.src = "images/done.svg";
    habitOne.appendChild(svg);
    habitOne.setAttribute("class", "habit-one");
    if (habitStatus[0] == true) habitOne.classList.add("habit-one-activate");
    day.appendChild(habitOne);

    const habitTwo = document.createElement("div");
    const svg2 = document.createElement("img");
    svg2.src = "images/done.svg";
    habitTwo.appendChild(svg2);
    habitTwo.setAttribute("class", "habit-two");
    if (habitStatus[1] == true) habitTwo.classList.add("habit-two-activate");

    day.appendChild(habitTwo);

    const habitThree = document.createElement("div");
    const svg3 = document.createElement("img");
    svg3.src = "images/done.svg";
    habitThree.appendChild(svg3);
    habitThree.setAttribute("class", "habit-three");
    if (habitStatus[2] == true)
      habitThree.classList.add("habit-three-activate");

    day.appendChild(habitThree);

    content.appendChild(day);
  }
}
