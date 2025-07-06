// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AddTask=()=>{
//      const [title, setTitle] = useState("");
//     const [tag, setTag] = useState("Work");
//     const [deadline, setDeadline] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if(!title.trim() || !deadline) return alert("Please fill all fields");

//         const newTask={
//             id: Date.now(),
//             title,
//             tag,
//             deadline,
//             done: false,
//         }

//         const existingTasks=JSON.parse(localStorage.getItem("devtasks")) || [];
//         localStorage.setItem("devtasks", JSON.stringify([newTask , ...existingTasks]));
        
//         navigate("/tasks");
//     }


//     return (
//         <div className="max-w-md mx-auto mt-6">
//             <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
//                 <input
//                 className="w-full p-2 border rounded"
//                 placeholder="Task title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 ></input>
//                 <select 
//                     value={tag}
//                     onChange={(e) => setTag(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 >
//                     <option value="Work">Work</option>
//                     <option value="Personal">Personal</option>
//                     <option value="Urgent">Urgent</option>
//                     <option value="Learning">Learning</option>
//                     <option value="Other">Other</option>
//                 </select>

//                 <input
//                     type='date'
//                     value={deadline}
//                     onChange={(e) => setDeadline(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 ></input>

//                 <button
//                     type="submit"
//                     className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors"
//                 >
//                     Add Task
//                 </button>
//             </form>
//         </div>
//     )
// }

// export default AddTask;

"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AddTask = () => {
  const [title, setTitle] = useState("")
  const [tag, setTag] = useState("Work")
  const [deadline, setDeadline] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !deadline) return alert("Please fill all fields")

    setIsSubmitting(true)

    // Simulate a brief loading state
    setTimeout(() => {
      const newTask = {
        id: Date.now(),
        title,
        tag,
        deadline,
        done: false,
      }

      console.log("New Task Created:", newTask)

      const existingTasks = JSON.parse(localStorage.getItem("devtasks")) || []
      localStorage.setItem("devtasks", JSON.stringify([newTask, ...existingTasks]))

      setIsSubmitting(false)
      navigate("/tasks")
    }, 500)
  }

  const getTagStyles = (tagValue) => {
    const tagStyles = {
      Work: "bg-teal-50 text-teal-800 border-teal-200",
      Personal: "bg-orange-50 text-orange-800 border-orange-200",
      Urgent: "bg-red-50 text-red-800 border-red-200",
      Learning: "bg-purple-50 text-purple-800 border-purple-200",
      Other: "bg-gray-50 text-gray-800 border-gray-200",
    }
    return tagStyles[tagValue] || tagStyles.Other
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8 font-sans">

      {/* Main Card */}
      <div className="max-w-lg mx-auto">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create New Task
            </h1>
            <p className="text-gray-600 text-base">Add a new task to stay organized and productive</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Task Title */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">Task Title</label>
              <input
                className={`w-full p-4 border-2 rounded-xl text-base transition-all duration-200 outline-none bg-white ${
                  focusedInput === "title"
                    ? "border-indigo-500 shadow-lg shadow-indigo-500/20 -translate-y-0.5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="Enter your task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => setFocusedInput("title")}
                onBlur={() => setFocusedInput(null)}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Category
                <span
                  className={`inline-block ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getTagStyles(tag)}`}
                >
                  {tag}
                </span>
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className={`w-full p-4 border-2 rounded-xl text-base transition-all duration-200 outline-none bg-white cursor-pointer ${
                  focusedInput === "tag"
                    ? "border-indigo-500 shadow-lg shadow-indigo-500/20 -translate-y-0.5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onFocus={() => setFocusedInput("tag")}
                onBlur={() => setFocusedInput(null)}
              >
                <option value="Work">💼 Work</option>
                <option value="Personal">🏠 Personal</option>
                <option value="Urgent">🚨 Urgent</option>
                <option value="Learning">📚 Learning</option>
                <option value="Other">📝 Other</option>
              </select>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={`w-full p-4 border-2 rounded-xl text-base transition-all duration-200 outline-none bg-white ${
                  focusedInput === "deadline"
                    ? "border-indigo-500 shadow-lg shadow-indigo-500/20 -translate-y-0.5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onFocus={() => setFocusedInput("deadline")}
                onBlur={() => setFocusedInput(null)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-8 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg rounded-xl transition-all duration-200 ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/30 active:translate-y-0"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">⏳</span>
                  Creating Task...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">✨</span>
                  Add Task
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  )
}

export default AddTask
