import { DateTime } from "ts-luxon";

export class Week {
  id: string;
  days: Day[] = [];
  startingDate: Date;
  count: number;
  comments: string;
  constructor(startingDate: Date, count: number) {
    this.id = crypto.randomUUID();
    this.count = count;
    this.startingDate = startingDate;
    this.days = new Array(7).fill("").map((_, i) => {
      return new Day(
        DateTime.fromJSDate(startingDate!)
          .plus({ days: i })
          .toISODate(),
        count
      );
    });
    this.comments = "";
  }
}

export class Day {
  id: string;
  date: string;
  count: number;
  tasks: Task[] = [];
  comments: string;
  constructor(date: string, count: number, comments = "") {
    this.id = crypto.randomUUID();
    this.date = date;
    this.count = count;
    this.comments = comments;
    this.tasks = new Array(count)
      .fill("")
      .map((_, i) => new Task(i + 1));
  }
}

export class Task {
  id: string;
  number: number;
  done: boolean;

  constructor(number: number, done = false) {
    this.id = crypto.randomUUID();
    this.number = number;
    this.done = done;
  }
}
