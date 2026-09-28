document.addEventListener("DOMContentLoaded", () => {
            // State
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [{
                    id: 1,
                    title: "Finalize Q4 product roadmap & quarterly budget",
                    priority: "High",
                    tag: "Work",
                    completed: false,
                    createdAt: "9:15 AM",
                    dueDate: "Today, 5:00 PM",
                },
                {
                    id: 2,
                    title: "Review pull requests for design system integration",
                    priority: "Medium",
                    tag: "Dev",
                    completed: false,
                    createdAt: "10:30 AM",
                },
                {
                    id: 3,
                    title: "Schedule 1-on-1 sync with design lead",
                    priority: "Low",
                    tag: "Meetings",
                    completed: false,
                    createdAt: "11:45 AM",
                },
                {
                    id: 4,
                    title: "Prepare slide deck for client proposal",
                    priority: "Medium",
                    tag: "Project",
                    completed: false,
                    createdAt: "1:20 PM",
                },
                {
                    id: 5,
                    title: "Morning standup meeting notes review",
                    priority: "Low",
                    tag: "Routine",
                    completed: true,
                    completedAt: "9:45 AM",
                },
                {
                    id: 6,
                    title: "Update user onboarding documentation",
                    priority: "Medium",
                    tag: "Docs",
                    completed: true,
                    completedAt: "11:15 AM",
                },
                {
                    id: 7,
                    title: "Send weekly analytics summary report",
                    priority: "Medium",
                    tag: "Reporting",
                    completed: true,
                    completedAt: "2:15 PM",
                },
            ];

            let activePriority = "Medium";
            let searchQuery = "";

            // DOM Elements
            const taskInput = document.getElementById("task-input");
            const taskTagSelect = document.getElementById("task-tag");
            const addTaskBtn = document.getElementById("add-task-btn");
            const pendingList = document.getElementById("pending-list");
            const completedList = document.getElementById("completed-list");
            const pendingBadge = document.getElementById("pending-badge");
            const completedBadge = document.getElementById("completed-badge");
            const pendingMetricCount = document.getElementById("pending-metric-count");
            const completionMetricRate = document.getElementById(
                "completion-metric-rate",
            );
            const clearAllBtn = document.getElementById("clear-all-btn");
            const priorityBtns = document.querySelectorAll(".priority-btn");
            const searchInput = document.querySelector(".search-bar input");

            // Priority Toggle Event Listeners
            priorityBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    priorityBtns.forEach((b) => b.classList.remove("active"));
                    btn.classList.add("active");
                    activePriority = btn.dataset.priority;
                });
            });

            // Search Input Event Listener
            if (searchInput) {
                searchInput.addEventListener("input", (e) => {
                    searchQuery = e.target.value.toLowerCase().trim();
                    render();
                });
            }

            // Save to LocalStorage
            function saveTasks() {
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }

            // Format Time Helper
            function getCurrentFormattedTime() {
                const now = new Date();
                return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            }

            // Real-Time Sidebar Tag Counters
            function updateSidebarTagCounts() {
                const workCount = tasks.filter((t) => t.tag === "Work").length;
                const personalCount = tasks.filter((t) => t.tag === "Personal").length;

                const workCountEl = document.querySelector(
                    ".tags-list li:nth-child(1) .count",
                );
                const personalCountEl = document.querySelector(
                    ".tags-list li:nth-child(2) .count",
                );

                if (workCountEl) workCountEl.textContent = workCount;
                if (personalCountEl) personalCountEl.textContent = personalCount;
            }

            // Render Function
            function render() {
                pendingList.innerHTML = "";
                completedList.innerHTML = "";

                // Filter tasks based on real-time search query
                const filteredTasks = tasks.filter(
                    (t) =>
                    t.title.toLowerCase().includes(searchQuery) ||
                    t.tag.toLowerCase().includes(searchQuery) ||
                    t.priority.toLowerCase().includes(searchQuery),
                );

                const pendingTasks = filteredTasks.filter((t) => !t.completed);
                const completedTasks = filteredTasks.filter((t) => t.completed);

                // Update Counts & Badges
                const totalPending = tasks.filter((t) => !t.completed).length;
                const totalCompleted = tasks.filter((t) => t.completed).length;

                pendingBadge.textContent = `${pendingTasks.length} pending`;
                completedBadge.textContent = `${completedTasks.length} completed`;
                pendingMetricCount.textContent = `${totalPending} Tasks`;

                const total = tasks.length;
                const rate = total === 0 ? 0 : Math.round((totalCompleted / total) * 100);
                completionMetricRate.textContent = `${rate}%`;

                // Update Sidebar Counts
                updateSidebarTagCounts();

                // Render Pending Tasks
                if (pendingTasks.length === 0) {
                    pendingList.innerHTML = searchQuery ?
                        `<div class="empty-state">No matching pending tasks found.</div>` :
                        `<div class="empty-state">🎉 All caught up! No pending tasks.</div>`;
                } else {
                    pendingTasks.forEach((task) => {
                        pendingList.appendChild(createTaskCard(task));
                    });
                }

                // Render Completed Tasks
                if (completedTasks.length === 0) {
                    completedList.innerHTML = searchQuery ?
                        `<div class="empty-state">No matching completed tasks found.</div>` :
                        `<div class="empty-state">No completed tasks yet.</div>`;
                } else {
                    completedTasks.forEach((task) => {
                        completedList.appendChild(createTaskCard(task));
                    });
                }

                saveTasks();
            }

            // Create Task Card Element
            function createTaskCard(task) {
                const card = document.createElement("div");
                card.className = `task-card ${task.completed ? "completed" : ""}`;
                card.dataset.id = task.id;

                const timeLabel = task.completed ?
                    `<i class="fa-solid fa-check-double"></i> Completed ${task.completedAt || ""}` :
                    `<i class="fa-regular fa-clock"></i> Added ${task.createdAt}`;

                const dueDateTag = task.dueDate ?
                    `<span class="due-date"><i class="fa-regular fa-calendar"></i> ${task.dueDate}</span>` :
                    "";

                card.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""} />
      <div class="task-content">
        <div class="task-title">${escapeHTML(task.title)}</div>
        <div class="task-meta">
          <span class="tag-pill">${task.tag}</span>
          <span>${timeLabel}</span>
          ${dueDateTag}
        </div>
      </div>
      ${!task.completed ? `<span class="priority-pill ${task.priority}">${task.priority}</span>` : ""}
      <div class="task-actions">
        <button class="action-btn edit" title="Edit Task"><i class="fa-solid fa-pen"></i></button>
        <button class="action-btn delete" title="Delete Task"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    // Event: Toggle Completion
    const checkbox = card.querySelector(".task-checkbox");
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      if (task.completed) {
        task.completedAt = getCurrentFormattedTime();
      }
      render();
    });

    // Event: Delete Task
    const deleteBtn = card.querySelector(".action-btn.delete");
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      render();
    });

    // Event: Inline Edit Task
    const editBtn = card.querySelector(".action-btn.edit");
    const titleEl = card.querySelector(".task-title");

    editBtn.addEventListener("click", () => {
      if (card.classList.contains("editing")) return;
      card.classList.add("editing");

      const input = document.createElement("input");
      input.type = "text";
      input.className = "edit-input";
      input.value = task.title;

      titleEl.replaceWith(input);
      input.focus();

      const saveEdit = () => {
        const updatedText = input.value.trim();
        if (updatedText) {
          task.title = updatedText;
        }
        render();
      };

      input.addEventListener("blur", saveEdit);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveEdit();
      });
    });

    return card;
  }

  // Add Task Function
  function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = {
      id: Date.now(),
      title: text,
      priority: activePriority,
      tag: taskTagSelect.value,
      completed: false,
      createdAt: getCurrentFormattedTime(),
    };

    tasks.unshift(newTask);
    taskInput.value = "";
    render();
  }

  // Sanitize Inputs
  function escapeHTML(str) {
    return str.replace(
      /[&<>'"]/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[tag] || tag,
    );
  }

  // Event Listeners
  addTaskBtn.addEventListener("click", addTask);

  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  clearAllBtn.addEventListener("click", () => {
    tasks = tasks.filter((t) => !t.completed);
    render();
  });

  // Initial Render
  render();
});