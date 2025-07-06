import { useEffect, useState } from "react";

const Stats = () => {
  const [done, setDone] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("devtasks") || "[]");
    const doneTasks = tasks.filter((t) => t.done).length;
    const pendingTasks = tasks.length - doneTasks;

    setDone(doneTasks);
    setPending(pendingTasks);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6 space-y-4">
      <h2 className="text-2xl font-bold text-purple-700">Task Stats</h2>
      <div className="flex justify-between text-lg">
        <p className="text-green-600">✅ Done:</p>
        <span>{done}</span>
      </div>
      <div className="flex justify-between text-lg">
        <p className="text-yellow-600">🕒 Pending:</p>
        <span>{pending}</span>
      </div>
      <div className="flex justify-between text-lg border-t pt-2">
        <p className="font-semibold">📋 Total:</p>
        <span>{done + pending}</span>
      </div>
    </div>
  );
};

export default Stats;
