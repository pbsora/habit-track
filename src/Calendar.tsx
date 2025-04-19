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
      <div className="flex justify-between items-center px-4 w-full h-12 text-white bg-red-500">
        <h1 className="text-lg font-bold font-rem">
          Weeks: {weeks.length}
        </h1>
        <NewWeekDialog setWeeks={setWeeks} />
      </div>
      <div className="">
        {!!weeks.length &&
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
  const [dayConfigs, setDayConfigs] = useState<{
    [key: number]: number;
  }>({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });

  const handleDayCount = (
    dayIndex: number,
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    if (numValue > 7 || numValue < 0) return;

    setDayConfigs((prev) => ({
      ...prev,
      [dayIndex]: numValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    const configs = Object.entries(dayConfigs).map(
      ([dayIndex, taskCount]) => ({
        dayIndex: parseInt(dayIndex),
        taskCount,
      })
    );

    const newWeek = new Week(date, configs);
    LocalStorage.add("weeks", [
      ...(LocalStorage.get("weeks") || []),
      newWeek,
    ]);

    setWeeks((prev) => [...prev, newWeek]);
  };

  return (
    <Dialog>
      <div className="flex items-center">
        <DialogTrigger>
          <Button variant={"ghost"} type="button">
            <Plus size={24} />
          </Button>
        </DialogTrigger>
        <Button
          onClick={() => LocalStorage.copyToClipboard()}
        >
          Clipboard
        </Button>
      </div>
      <DialogContent>
        <div className="flex absolute inset-0 justify-center items-center m-auto">
          <DialogTrigger asChild>
            <div className="absolute z-0 w-screen h-screen bg-zinc-900/70" />
          </DialogTrigger>
          <form
            className="flex z-10 flex-col gap-6 p-10 w-4/6 h-5/6 rounded-xl bg-zinc-900"
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
                className="rounded-md border w-fit"
              />
              <div className="w-2/4">
                <h2 className="mb-4 text-lg text-zinc-200">
                  Habits per day:
                </h2>
                <div className="space-y-3">
                  {[
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun",
                  ].map((day, index) => (
                    <div
                      key={day}
                      className="flex gap-4 items-center"
                    >
                      <label className="w-12 text-zinc-200">
                        {day}:
                      </label>
                      <input
                        type="number"
                        className="px-2 py-1 w-16 text-white rounded-md border bg-zinc-900"
                        min="0"
                        max="7"
                        value={dayConfigs[index]}
                        onChange={(e) =>
                          handleDayCount(
                            index,
                            e.target.value
                          )
                        }
                      />
                      <div className="flex flex-1 gap-1">
                        {Array.from({
                          length: dayConfigs[index],
                        }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 ${colors[i]}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="m-auto w-2/4 bg-zinc-200 text-zinc-800"
            >
              Add
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
