'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const NewPage = ({ params }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = formData;

  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then((response) => response.json())
        .then((data) =>
          setFormData({
            title: data.title,
            description: data.description,
          }),
        );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      const response = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data);
    } else {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
      }

      const data = await response.json();
    }
    router.refresh();
    router.push('/');
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/tasks/${params.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    console.log(response);

    if (!response.ok) {
      console.error('Error:', response.statusText);
      return;
    }

    const data = await response.json();
    router.push('/');
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="flex flex-col gap-y-4 bg-slate-800 rounded-md p-10">
        <label htmlFor="title" className="text-xl font-semibold">
          Title
        </label>
        <input
          type="text"
          className="px-4 py-2 rounded-md focus:outline-none"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <label htmlFor="description" className="text-xl font-semibold">
          Description
        </label>

        <textarea
          cols="30"
          rows="3"
          name="description"
          value={description}
          onChange={handleChange}
          className="px-4 py-2 rounded-md focus:outline-none"
        ></textarea>
        <div className="flex gap-x-2 justify-end">
          {params.id ? (
            <button
              className="bg-red-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition-colors duration-300"
              onClick={handleDelete}
            >
              Delete
            </button>
          ) : (
            ''
          )}
          <button
            className="bg-slate-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-slate-700 transition-colors duration-300"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPage;
