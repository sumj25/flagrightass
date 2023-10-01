import React from "react";


const CronSchedule = ({ isCronRunning, onStartCron, onStopCron }) => {
  return (
    <div className="flex flex-col">
      <h2>Cron Control</h2>
      <div className="flex items-center justify-between">
        <button
          onClick={onStartCron}
          disabled={isCronRunning}
          className="rounded-xl text-sm px-6 border-none outline-none p-2 text-white bg-green-600 font-bold hover:bg-green-700"
        >
          Start Cron
        </button>
        <button
          className="cursor-pointer rounded-xl text-sm px-6 border-none outline-none mt-4 p-2 text-white bg-red-600 font-bold hover:bg-red-700"
          onClick={onStopCron}
          disabled={!isCronRunning}
        >
          Stop Cron
        </button>
      </div>
      <p className="text-center w-full text-white mt-12">
        {isCronRunning ? "Cron is currently running" : "Cron is stopped"}
      </p>
    </div>
  );
};

export default CronSchedule;
