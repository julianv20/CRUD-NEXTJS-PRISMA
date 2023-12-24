'use client';

import TasksCard from '@/components/TasksCard';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function HomePage() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch('http://localhost:3000/api/tasks');
        const data = await resp.json();
        setData(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    fetchData();
  }, []);

  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center p-5 bg-neutral-700">
        <h1 className="text-2xl font-bold">Crud Julian Vanegas</h1>
        <button
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          onClick={() => router.push('/new')}
        >
          Create a task
        </button>
      </div>
      <div className="container mx-auto w-full">
        <div className="w-full p-5 md:p-5 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
          {data?.map((task) => (
            <TasksCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
