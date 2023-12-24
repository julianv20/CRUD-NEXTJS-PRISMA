'use client';

import { useRouter } from 'next/navigation';

const TasksCard = ({ task }) => {
  const router = useRouter();

  return (
    <div
      key={task.id}
      className="bg-slate-700 p-5 rounded-md cursor-pointer hover:bg-slate-800 transition-colors duration-300"
      onClick={() => router.push(`/tasks/edit/${task.id}`)}
    >
      <div className="flex justify-end">
        <span className="text-xs font-light mb-2">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
      <h5 className="font-bold">{task.title}</h5>
      <p className="text-sm">{task.description}</p>
    </div>
  );
};

export default TasksCard;
