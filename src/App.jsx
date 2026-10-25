import { useState } from "react";
import "./App.css";

const initialCategories = [
  { name: "Workout", icon: "⚡", color: "#d4a5ff", done: 0, total: 1 },
  { name: "Haircare", icon: "✦", color: "#ffb4c8", done: 0, total: 1 },
  { name: "New Learnings", icon: "◇", color: "#8bd9ff", done: 0, total: 1 },
  { name: "Academics", icon: "▤", color: "#ffd18a", done: 0, total: 1 },
  { name: "Daily Habits", icon: "☀", color: "#a8e6bd", done: 0, total: 1 },
  { name: "Journal", icon: "✎", color: "#f2b4ff", done: 0, total: 1 },
];

const initialTasks = [
  { id: 1, title: "Plan today's priorities", category: "Daily Habits", xp: 10, done: false },
  { id: 2, title: "Study something new", category: "New Learnings", xp: 25, done: false },
  { id: 3, title: "Review class notes", category: "Academics", xp: 20, done: false },
];

const navItems = [
  { name: "Home", icon: "⌂" },
  { name: "To-Do", icon: "☷" },
  { name: "Goals", icon: "◎" },
  { name: "Progress", icon: "↗" },
  { name: "Profile", icon: "◉" },
];

export default function App() {
  const [page, setPage] = useState("Home");
  const [categories] = useState(initialCategories);
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [xp, setXp] = useState(0);

  const completed = tasks.filter((task) => task.done).length;
  const dailyPercent = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id) return task;
        setXp((value) => Math.max(0, value + (task.done ? -task.xp : task.xp)));
        return { ...task, done: !task.done };
      })
    );
  }

  function addTask(event) {
    event.preventDefault();
    if (!newTask.trim()) return;
    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: newTask.trim(),
        category: "Daily Habits",
        xp: 10,
        done: false,
      },
    ]);
    setNewTask("");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">L</div>
          <div>
            <strong>LEVEL UP</strong>
            <span>YOUR LIFE, YOUR RULES</span>
          </div>
        </div>

        <div className="nav-label">WORKSPACE</div>
        <nav className="side-nav">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${page === item.name ? "active" : ""}`}
              onClick={() => setPage(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
              {item.name === "To-Do" && (
                <span className="nav-count">{tasks.filter((t) => !t.done).length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="mini-avatar">LV</div>
          <div className="sidebar-user">
            <strong>Your journey</strong>
            <span>Level 1 · Beginner</span>
          </div>
          <span className="online-dot" />
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="eyebrow">YOUR PERSONAL PROGRESS SYSTEM</span>
            <h1>{page === "Home" ? "Dashboard" : page}</h1>
          </div>
          <div className="topbar-right">
            <span className="date-pill">{new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
            <div className="avatar">U</div>
          </div>
        </header>

        {page === "Home" && (
          <>
            <section className="welcome-row">
              <div>
                <p className="muted">YOUR NEXT CHAPTER STARTS NOW</p>
                <h2>Small steps. <span>Big evolution.</span></h2>
                <p className="welcome-copy">
                  Show up for yourself today. Every completed task is progress.
                </p>
              </div>
              <div className="hero-symbol">✧</div>
            </section>

            <section className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon purple">✧</span>
                <span className="stat-label">TOTAL EXPERIENCE</span>
                <strong>{xp} <small>XP</small></strong>
                <span className="stat-note">Earn XP by completing tasks</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon blue">↗</span>
                <span className="stat-label">CURRENT LEVEL</span>
                <strong>{Math.floor(xp / 100) + 1}</strong>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${xp % 100}%` }} />
                </div>
                <span className="stat-note">{xp % 100}/100 XP to next level</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon green">✓</span>
                <span className="stat-label">DAILY TASKS</span>
                <strong>{completed}<small> / {tasks.length}</small></strong>
                <span className="stat-note">{dailyPercent}% completed today</span>
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">BUILD YOUR CHARACTER</span>
                  <h2>Your categories</h2>
                </div>
                <span className="subtle-count">{categories.length} AREAS</span>
              </div>
              <div className="category-grid">
                {categories.map((category) => (
                  <button
                    className="category-card"
                    key={category.name}
                    onClick={() => setPage("To-Do")}
                  >
                    <span className="category-icon" style={{ color: category.color, background: `${category.color}18` }}>
                      {category.icon}
                    </span>
                    <strong>{category.name}</strong>
                    <span className="category-sub">Build consistency</span>
                    <span className="category-arrow">↗</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="section-block tasks-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">ONE TASK AT A TIME</span>
                  <h2>Today's quests</h2>
                </div>
                <button className="text-button" onClick={() => setPage("To-Do")}>View all ↗</button>
              </div>
              <TaskList tasks={tasks.slice(0, 3)} onToggle={toggleTask} />
            </section>
          </>
        )}

        {page === "To-Do" && (
          <section className="section-block page-panel">
            <span className="eyebrow">MAKE IT HAPPEN</span>
            <h2>Your quests</h2>
            <p className="welcome-copy">Complete tasks to earn XP. Start with one small win.</p>
            <form className="add-task-form" onSubmit={addTask}>
              <input
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                placeholder="What do you want to get done?"
                aria-label="New task"
              />
              <button type="submit">+ Add task</button>
            </form>
            <TaskList tasks={tasks} onToggle={toggleTask} />
            <p className="footnote">Prototype: tasks and XP reset when this page is refreshed.</p>
          </section>
        )}

        {page === "Goals" && (
          <section className="section-block page-panel">
            <span className="eyebrow">THINK BIGGER</span>
            <h2>Goals & milestones</h2>
            <div className="empty-state"><span>◎</span><h3>Your next big goal starts here.</h3><p>Goal creation and milestone tracking are coming next.</p></div>
          </section>
        )}

        {page === "Progress" && (
          <section className="section-block page-panel">
            <span className="eyebrow">LOOK HOW FAR YOU CAN GO</span>
            <h2>Your progress</h2>
            <div className="progress-summary">
              <div><span className="stat-label">TASKS COMPLETED</span><strong>{completed}</strong></div>
              <div><span className="stat-label">XP EARNED</span><strong>{xp}</strong></div>
              <div><span className="stat-label">COMPLETION RATE</span><strong>{dailyPercent}%</strong></div>
            </div>
            <p className="footnote">Weekly reports and the activity heatmap will be added in a later version.</p>
          </section>
        )}

        {page === "Profile" && (
          <section className="section-block page-panel">
            <span className="eyebrow">THIS IS YOUR JOURNEY</span>
            <h2>Your profile</h2>
            <div className="profile-card">
              <div className="profile-avatar">U</div>
              <div><h3>Level {Math.floor(xp / 100) + 1} Adventurer</h3><p>{xp} XP earned so far</p></div>
            </div>
            <div className="empty-state"><span>✧</span><h3>Your journey, your rules.</h3><p>Achievements, appearance settings, custom backgrounds and account sync are planned for upcoming versions.</p></div>
          </section>
        )}

        <footer className="footer">LEVEL UP <span>·</span> Progress, not perfection.</footer>
      </main>

      <nav className="mobile-nav">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={page === item.name ? "mobile-active" : ""}
            onClick={() => setPage(item.name)}
          >
            <span>{item.icon}</span>{item.name}
          </button>
        ))}
      </nav>
    </div>
  );
}

function TaskList({ tasks, onToggle }) {
  if (!tasks.length) {
    return <div className="empty-tasks">No quests yet. Add your first task above.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className={`task-row ${task.done ? "task-done" : ""}`} key={task.id}>
          <button
            className={`task-check ${task.done ? "checked" : ""}`}
            onClick={() => onToggle(task.id)}
            aria-label={task.done ? "Mark task incomplete" : "Complete task"}
          >
            {task.done ? "✓" : ""}
          </button>
          <div className="task-info">
            <strong>{task.title}</strong>
            <span>{task.category}</span>
          </div>
          <span className="task-xp">+{task.xp} XP</span>
        </div>
      ))}
    </div>
  );
}