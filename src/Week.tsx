import { Check } from "lucide-react";
import { Day, Week } from "./models/models";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import { FormEvent, useState } from "react";

const colors = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

const WeekItem = ({
  week,
  i,
  setWeeks,
}: {
  week: Week;
  i: number;
  setWeeks: React.Dispatch<React.SetStateAction<Week[]>>;
}) => {
  const [desc, setDesc] = useState(week.comments);

  const toggleDone = (
    weekId: string,
    dayId: string,
    taskId: string
  ) => {
    const updatedWeek = week.days.map((day) => {
      if (day.id === dayId) {
        return {
          ...day,
          tasks: day.tasks.map((task) => {
            if (task.id === taskId) {
              task.done = !task.done;
            }
            return task;
          }),
        };
      }
      return day;
    });

    setWeeks((prev: Week[]) => {
      return prev.map((week) => {
        if (week.id === weekId) {
          week.days = updatedWeek;
        }
        return week;
      });
    });
  };

  const changeDesc = (e: FormEvent, weekId = week.id) => {
    e.preventDefault();

    if (!desc.trim()) return;

    setWeeks((prev: Week[]) => {
      return prev.map((week) => {
        if (week.id === weekId) {
          week.comments = desc;
        }
        return week;
      });
    });
  };

  const delWeek = (weekId: string) => {
    setWeeks((prev: Week[]) => {
      return prev.filter((week) => week.id !== weekId);
    });
  };

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger className="w-full text-left">
          <div className="w-full bg-red-500 mt-2 text-white py-1 px-4 text-lg font-rem font-bold">
            {"Week " + (i + 1)}
          </div>
        </DialogTrigger>
        <DialogContent className="h-3/4 bg-zinc-900 text-white flex flex-col gap-10">
          <DialogHeader className="text-2xl font-inter">
            Week {i + 1}
          </DialogHeader>
          <form
            className="h-fit flex flex-col gap-10"
            onSubmit={(e) => changeDesc(e)}
          >
            <textarea
              className="w-full h-1/2 p-2 bg-zinc-900 text-white border rounded-xl"
              placeholder="Comments"
              rows={20}
              defaultValue={week.days[0].comments}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
            <div className="flex flex-col gap-2">
              <Button className="w-full py-2 bg-white text-black hover:bg-slate-300">
                Update
              </Button>
              <Button
                type="button"
                onClick={() => delWeek(week.id)}
                variant={"destructive"}
                className="w-full py-2"
              >
                Delete
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <div className="w-full grid grid-cols-7 gap-x-2 mt-2 px-2">
        {week.days.map((day) => (
          <DayItem
            key={day.id}
            day={day}
            toggleDone={toggleDone}
            weekId={week.id}
          />
        ))}
      </div>
    </div>
  );
};
export default WeekItem;

const DayItem = ({
  day,
  toggleDone,
  weekId,
}: {
  day: Day;
  toggleDone: (
    weekId: string,
    dayId: string,
    taskId: string
  ) => void;
  weekId: string;
}) => {
  return (
    <div className="w-full h-44 bg-white rounded-xl overflow-hidden flex flex-col">
      <div className="text-white text-lg py-1 text-center font-rem font-bold bg-red-600">
        {day.date
          .split("-")
          .reverse()
          .join("/")
          .slice(0, 5)}
      </div>
      <div className={`flex flex-col h-full`}>
        {day.tasks.map((task, i) => (
          <div
            key={i}
            onClick={() =>
              toggleDone(weekId, day.id, task.id)
            }
            className={`w-full flex-1 group ${
              task.done && colors[i]
            } flex items-center justify-center transition-all duration-200 cursor-pointer`}
          >
            <Check
              className={`group-hover:visible ${
                task.done
                  ? "visible text-white"
                  : "invisible text-black"
              } duration-100 `}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
