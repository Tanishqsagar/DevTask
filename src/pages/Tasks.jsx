"use client"

import { useState, useEffect } from "react"

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingTask, setEditingTask] = useState(null)
  const [editForm, setEditForm] = useState({
    title: "",
    tag: "",
    deadline: "",
  })

  useEffect(() => {
    // Fetch tasks from the server or local storage
    const data = JSON.parse(localStorage.getItem("devtasks")) || []
    setTasks(data)
  }, [])

  const updateLocal = (updated) => {
    localStorage.setItem("devtasks", JSON.stringify(updated))
    setTasks(updated)
  }

  const handleDelete = (id) => {
    const updated = tasks.filter((task) => task.id !== id)
    updateLocal(updated)
  }

  const toggleDone = (id) => {
    const updated = tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    updateLocal(updated)
  }

  const startEdit = (task) => {
    setEditingTask(task.id)
    setEditForm({
      title: task.title,
      tag: task.tag,
      deadline: task.deadline,
    })
  }

  const cancelEdit = () => {
    setEditingTask(null)
    setEditForm({ title: "", tag: "", deadline: "" })
  }

  const saveEdit = () => {
    if (!editForm.title.trim() || !editForm.deadline) {
      alert("Please fill all fields")
      return
    }

    const updated = tasks.map((task) =>
      task.id === editingTask
        ? { ...task, title: editForm.title, tag: editForm.tag, deadline: editForm.deadline }
        : task,
    )
    updateLocal(updated)
    setEditingTask(null)
    setEditForm({ title: "", tag: "", deadline: "" })
  }

  const getTagStyles = (tag) => {
    const tagStyles = {
      Work: "bg-blue-100 text-blue-800 border-blue-200",
      Personal: "bg-orange-100 text-orange-800 border-orange-200",
      Urgent: "bg-red-100 text-red-800 border-red-200",
      Learning: "bg-purple-100 text-purple-800 border-purple-200",
      Other: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return tagStyles[tag] || tagStyles.Other
  }

  const getTagEmoji = (tag) => {
    const emojis = {
      Work: "💼",
      Personal: "🏠",
      Urgent: "🚨",
      Learning: "📚",
      Other: "📝",
    }
    return emojis[tag] || "📝"
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays === -1) return "Yesterday"
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`
    return `${diffDays} days left`
  }

  const isOverdue = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    return date < today
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.done) ||
      (filter === "pending" && !task.done) ||
      (filter === "overdue" && !task.done && isOverdue(task.deadline))

    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.done).length,
    pending: tasks.filter((t) => !t.done).length,
    overdue: tasks.filter((t) => !t.done && isOverdue(t.deadline)).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Your Tasks
          </h1>
          <p className="text-gray-600 text-lg">Stay organized and productive with your task management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
            <div className="text-2xl font-bold text-indigo-600">{taskStats.total}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
            <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
            <div className="text-2xl font-bold text-orange-600">{taskStats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
            <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-200 bg-white"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {[
                { key: "all", label: "All", color: "indigo" },
                { key: "pending", label: "Pending", color: "orange" },
                { key: "completed", label: "Completed", color: "green" },
                { key: "overdue", label: "Overdue", color: "red" },
              ].map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                    filter === filterOption.key
                      ? `bg-${filterOption.color}-500 text-white shadow-lg shadow-${filterOption.color}-500/30`
                      : `text-${filterOption.color}-600 hover:bg-${filterOption.color}-50 border border-${filterOption.color}-200`
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {tasks.length === 0 ? "No tasks yet" : "No tasks match your filter"}
            </h3>
            <p className="text-gray-500 mb-6">
              {tasks.length === 0
                ? "Create your first task to get started with productivity!"
                : "Try adjusting your search or filter criteria."}
            </p>
            {tasks.length === 0 && (
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 hover:-translate-y-1">
                Add Your First Task
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-200 ${
                  editingTask === task.id ? "ring-2 ring-indigo-500 shadow-2xl" : "hover:-translate-y-1"
                } ${task.done ? "opacity-75" : ""}`}
              >
                {editingTask === task.id ? (
                  /* Edit Mode */
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-2xl">{getTagEmoji(editForm.tag)}</div>
                      <h3 className="text-lg font-semibold text-indigo-600">Editing Task</h3>
                    </div>

                    {/* Edit Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-200"
                          placeholder="Enter task title..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <select
                            value={editForm.tag}
                            onChange={(e) => setEditForm({ ...editForm, tag: e.target.value })}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-200"
                          >
                            <option value="Work">💼 Work</option>
                            <option value="Personal">🏠 Personal</option>
                            <option value="Urgent">🚨 Urgent</option>
                            <option value="Learning">📚 Learning</option>
                            <option value="Other">📝 Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                          <input
                            type="date"
                            value={editForm.deadline}
                            onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-200"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Edit Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={saveEdit}
                        className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200 hover:-translate-y-0.5"
                      >
                        ✅ Save Changes
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-6 py-2 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-all duration-200 hover:-translate-y-0.5"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Task Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-2xl">{getTagEmoji(task.tag)}</div>
                        <div className="flex-1">
                          <h3
                            className={`text-xl font-semibold mb-2 ${
                              task.done ? "line-through text-gray-500" : "text-gray-800"
                            }`}
                          >
                            {task.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagStyles(task.tag)}`}
                            >
                              {task.tag}
                            </span>
                            <span
                              className={`text-sm font-medium ${
                                isOverdue(task.deadline) && !task.done
                                  ? "text-red-600"
                                  : task.done
                                    ? "text-gray-500"
                                    : "text-gray-600"
                              }`}
                            >
                              📅 {formatDate(task.deadline)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => startEdit(task)}
                        className="px-4 py-2 rounded-xl font-medium text-sm bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-indigo-500/30"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => toggleDone(task.id)}
                        className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                          task.done
                            ? "bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg shadow-yellow-500/30"
                            : "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/30"
                        }`}
                      >
                        {task.done ? "↩️ Undo" : "✅ Done"}
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="px-4 py-2 rounded-xl font-medium text-sm bg-red-500 text-white hover:bg-red-600 transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-red-500/30"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                )}

                {/* Progress Bar for Overdue Tasks */}
                {isOverdue(task.deadline) && !task.done && editingTask !== task.id && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-2 text-red-700 text-sm font-medium">
                      <span>⚠️</span>
                      <span>This task is overdue!</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tasks
