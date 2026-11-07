import { useEffect, useState } from "react";
import {
  Archive,
  Plus,
  Trash2,
  Search,
  BookOpen,
  X,
  Feather,
  ScrollText,
} from "lucide-react";
import "./PersonalSections.css";

const STORAGE_KEY = "beyond-veil-archives";

const categories = [
  "All",
  "Memory",
  "Achievement",
  "Lesson",
  "Reflection",
  "Other",
];

function loadEntries() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default function Archives() {
  const [entries, setEntries] = useState(loadEntries);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Memory");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  function addEntry(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      category,
      date: new Date().toISOString(),
    };

    setEntries(current => [newEntry, ...current]);
    setTitle("");
    setContent("");
    setCategory("Memory");
    setShowForm(false);
  }

  function deleteEntry(id) {
    setEntries(current => current.filter(entry => entry.id !== id));
    setSelected(null);
  }

  const filteredEntries = entries.filter(entry => {
    const matchesCategory = filter === "All" || entry.category === filter;
    const term = search.toLowerCase();

    const matchesSearch =
      entry.title.toLowerCase().includes(term) ||
      entry.content.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="personal-section archives-section">
      <header className="archive-hero">
        <div className="archive-hero-symbol">
          <BookOpen size={35} />
        </div>

        <span className="personal-kicker">THE KEEPER'S COLLECTION</span>
        <h1>The Ancient Archives</h1>
        <p>
          Some moments deserve a place beyond the passing of time.
          Preserve the memories, lessons and achievements you wish to revisit.
        </p>

        <div className="archive-count">
          <Archive size={21} />
          <div>
            <strong>{entries.length}</strong>
            <span>Records preserved</span>
          </div>
        </div>
      </header>

      <section className="archive-library">
        <div className="archive-library-heading">
          <div>
            <span className="personal-kicker">THE KEEPER'S DESK</span>
            <h2>Preserve a New Record</h2>
          </div>

          <button
            className="archive-add-button"
            onClick={() => setShowForm(value => !value)}
          >
            {showForm ? <X size={17} /> : <Plus size={17} />}
            {showForm ? "CLOSE" : "NEW RECORD"}
          </button>
        </div>

        {showForm && (
          <div className="archive-form-panel">
            <div className="archive-form-heading">
              <Feather size={22} />
              <div>
                <h3>Write a New Entry</h3>
                <p>Give an important moment a permanent place.</p>
              </div>
            </div>

            <form onSubmit={addEntry} className="personal-form">
              <label>
                RECORD TITLE
                <input
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                  placeholder="Give this memory a title..."
                  maxLength={100}
                  required
                />
              </label>

              <label>
                YOUR RECORD
                <textarea
                  value={content}
                  onChange={event => setContent(event.target.value)}
                  placeholder="Write down the memory, lesson or moment you want to preserve..."
                  rows={5}
                  maxLength={3000}
                  required
                />
              </label>

              <label>
                RECORD TYPE
                <select
                  value={category}
                  onChange={event => setCategory(event.target.value)}
                >
                  <option>Memory</option>
                  <option>Achievement</option>
                  <option>Lesson</option>
                  <option>Reflection</option>
                  <option>Other</option>
                </select>
              </label>

              <button className="archive-submit" type="submit">
                <Archive size={17} /> PRESERVE THIS RECORD
              </button>
            </form>
          </div>
        )}
      </section>

      <section className="archive-collection">
        <div className="archive-collection-heading">
          <div>
            <span className="personal-kicker">THE LIBRARY</span>
            <h2>Records of Your Journey</h2>
          </div>
          <ScrollText size={25} />
        </div>

        <div className="archive-toolbar">
          <div className="archive-search">
            <Search size={18} />
            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search the ancient archives..."
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <X size={15} />
              </button>
            )}
          </div>

          <div className="archive-filters">
            {categories.map(item => (
              <button
                key={item}
                className={filter === item ? "selected" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="archive-empty">
            <BookOpen size={42} />
            <h3>
              {entries.length === 0
                ? "The library awaits its first story."
                : "No records found."}
            </h3>
            <p>
              {entries.length === 0
                ? "Preserve a memory or achievement to begin your collection."
                : "Try another search or choose a different category."}
            </p>
            {entries.length === 0 && (
              <button
                className="archive-add-button"
                onClick={() => setShowForm(true)}
              >
                <Plus size={16} /> WRITE YOUR FIRST RECORD
              </button>
            )}
          </div>
        ) : (
          <div className="archive-library-grid">
            {filteredEntries.map((entry, index) => (
              <article
                className="archive-library-card"
                key={entry.id}
                onClick={() => setSelected(entry)}
              >
                <div className="archive-card-decoration">
                  <span>✧ {entry.category} ✧</span>
                  <span className="archive-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="archive-scroll-icon">
                  <ScrollText size={25} />
                </div>

                <h3>{entry.title}</h3>

                <p>
                  {entry.content.length > 125
                    ? `${entry.content.slice(0, 125)}...`
                    : entry.content}
                </p>

                <div className="archive-card-bottom">
                  <span>
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <button
                    onClick={event => {
                      event.stopPropagation();
                      deleteEntry(entry.id);
                    }}
                    aria-label={`Delete ${entry.title}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <span className="archive-read-more">OPEN RECORD →</span>
              </article>
            ))}
          </div>
        )}
      </section>

      {selected && (
        <div
          className="archive-reading-overlay"
          onClick={() => setSelected(null)}
        >
          <article
            className="archive-reading-panel"
            onClick={event => event.stopPropagation()}
          >
            <button
              className="archive-reading-close"
              onClick={() => setSelected(null)}
              aria-label="Close record"
            >
              <X size={20} />
            </button>

            <div className="archive-reading-icon">
              <BookOpen size={32} />
            </div>

            <span className="personal-kicker">
              ✧ {selected.category} ✧
            </span>

            <h2>{selected.title}</h2>

            <span className="archive-reading-date">
              PRESERVED ON {new Date(selected.date).toLocaleString()}
            </span>

            <div className="archive-reading-divider">✦ ✧ ✦</div>

            <p>{selected.content}</p>

            <button
              className="archive-reading-delete"
              onClick={() => deleteEntry(selected.id)}
            >
              <Trash2 size={15} /> REMOVE RECORD
            </button>
          </article>
        </div>
      )}

      <div className="archive-footer">
        <span>✧</span>
        What you choose to remember becomes part of your story.
        <span>✧</span>
      </div>
    </div>
  );
}