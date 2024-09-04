import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import React, { useEffect, useState } from "react";
import { Dialog } from "./components/ui/dialog";
import {
  DialogContent,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Calendar } from "./components/ui/calendar";
import WeekItem from "./Week";
import { Week } from "./models/models";
import LocalStorage from "./LocalStorage";

const colors = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

const CalendarOverlay = () => {
  const [weeks, setWeeks] = useState<Week[]>(
    LocalStorage.get("weeks") || []
  );

  useEffect(() => {
    const updateWeeks = () => {
      LocalStorage.update("weeks", weeks);
    };

    updateWeeks();
  }, [weeks]);

  return (
    <div
      className="w-[70%] h-5/6 rounded-xl bg-zinc-900/70 overflow-y-auto"
      id="weeks"
    >
      <div className="w-full h-12 items-center flex justify-between px-4 bg-red-500 text-white">
        <h1 className="font-rem font-bold text-lg">
          Weeks: {weeks.length}
        </h1>
        <NewWeekDialog setWeeks={setWeeks} />
      </div>
      <div className="">
        {weeks.length > 0 &&
          weeks.map((week, i) => (
            <WeekItem
              week={week}
              i={i}
              setWeeks={setWeeks}
            />
          ))}
      </div>
    </div>
  );
};
export default CalendarOverlay;

const NewWeekDialog = ({
  setWeeks,
}: {
  setWeeks: React.Dispatch<React.SetStateAction<Week[]>>;
}) => {
  const [date, setDate] = useState<Date | undefined>(
    new Date()
  );
  const [count, setCount] = useState(1);

  const handleCount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (+e.target.value > 7 || +e.target.value < 1) return;

    setCount(+e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || count < 1) return;

    const newWeek = new Week(date, count);
    const totalWeeks = LocalStorage.get("weeks");

    const weeks = totalWeeks
      ? [...totalWeeks, newWeek]
      : [newWeek];

    LocalStorage.add("weeks", weeks);

    setWeeks((prev) => [...prev, newWeek]);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"ghost"} type="button">
          <Plus size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="absolute inset-0 m-auto flex items-center justify-center">
          <DialogTrigger asChild>
            <div className="w-screen h-screen bg-zinc-900/70 absolute z-0" />
          </DialogTrigger>
          <form
            className="p-10 w-4/6 h-5/6  bg-zinc-900 flex flex-col gap-6 z-10 rounded-xl"
            onSubmit={(e) => handleSubmit(e)}
          >
            <h1 className="text-3xl text-zinc-200">
              New week:
            </h1>
            <div className="flex justify-around">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md w-fit border"
              />
              <div className="w-2/4">
                <label
                  htmlFor="count"
                  className="text-zinc-200 block text-lg mb-2"
                >
                  Number of days:
                </label>
                <input
                  type="number"
                  id="count"
                  name="count"
                  className={`rounded-md border w-2/4 py-1 px-3 bg-zinc-900 text-white`}
                  onChange={(e) => handleCount(e)}
                  value={count}
                />
                <div className=" mt-3">
                  {new Array(count).fill("").map((_, i) => (
                    <div
                      className={`${colors[i]} w-full h-6`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="bg-zinc-200 text-zinc-800 w-2/4 m-auto"
            >
              Add
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
