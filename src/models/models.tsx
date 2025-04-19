import { DateTime } from "ts-luxon";

export interface DayConfig {
  dayIndex: number;
  taskCount: number;
}

export class Week {
  id: string;
  days: Day[] = [];
  startingDate: Date;
  comments: string;

  constructor(startingDate: Date, dayConfigs: DayConfig[]) {
    this.id = crypto.randomUUID();
    this.startingDate = startingDate;

    // Create an array of 7 days with default task count of 0
    this.days = new Array(7).fill("").map((_, i) => {
      const config = dayConfigs.find(
        (c) => c.dayIndex === i
      );
      const taskCount = config ? config.taskCount : 0;

      return new Day(
        DateTime.fromJSDate(startingDate!)
          .plus({ days: i })
          .toISODate(),
        taskCount
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
