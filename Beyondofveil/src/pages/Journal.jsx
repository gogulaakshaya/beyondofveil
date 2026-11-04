
import { useEffect, useState } from "react";
import {
  BookOpen, Plus, Search, Pencil, Trash2,
  X, Save, Sparkles, Feather
} from "lucide-react";
import "./Journal.css";

const STORAGE_KEY = "beyond-veil-journal";

const prompts = [
  "What is something you discovered about yourself today?",
  "What challenged you today, and how did you respond?",
  "Which personal strength are you grateful for?",
  "What is one thing you would like to improve?",
  "What would you tell your future self?",
  "When did you feel most confident recently?"
];

const moods = ["Peaceful", "Happy", "Anxious", "Thoughtful", "Sad", "Hopeful"];

function getSavedEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function Journal() {
  const [entries, setEntries] = useState(getSavedEntries);
  const [mode, setMode] = useState("Free Writing");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");
  const [mood, setMood] = useState("Thoughtful");
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  function openNewEntry(selectedMode = "Free Writing") {
    setEditingId(null);
    setMode(selectedMode);
    setTitle("");
    setContent("");
    setCategory("Personal");
    setMood("Thoughtful");
    setPrompt("");
    setShowEditor(true);
  }

  function editEntry(entry) {
    setEditingId(entry.id);
    setMode(entry.mode);
    setTitle(entry.title);
    setContent(entry.content);
    setCategory(entry.category);
    setMood(entry.mood);
    setPrompt(entry.prompt || "");
    setShowEditor(true);
  }

  function saveEntry() {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both a title and your thoughts.");
      return;
    }

    const now = new Date().toISOString();

    if (editingId) {
      setEntries(previous =>
        previous.map(entry =>
          entry.id === editingId
            ? {
                ...entry,
                title: title.trim(),
                content: content.trim(),
                category,
                mood,
                mode,
                prompt,
                updatedAt: now
              }
            : entry
        )
      );
    } else {
      const newEntry = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        category,
        mood,
        mode,
        prompt,
        createdAt: now,
        updatedAt: now
      };

      setEntries(previous => [newEntry, ...previous]);
    }

    setShowEditor(false);
  }

  function deleteEntry(id) {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {
      setEntries(previous => previous.filter(entry => entry.id !== id));
    }
  }

  const filteredEntries = entries.filter(entry => {
    const matchesSearch =
      (entry.title + " " + entry.content)
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || entry.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  return (
    <div className="journal-page">
      <div className="journal-heading">
        <span className="eyebrow">THE LIBRARY OF MEMORIES</span>
        <h1>Your private <em>sanctuary.</em></h1>
        <p>Every thought deserves a place. Every story deserves to be heard.</p>
      </div>

      <div className="journal-welcome">
        <div>
          <Sparkles size={22} />
          <span className="eyebrow">A NOTE FROM THE KEEPER</span>
          <h2>Your thoughts belong here.</h2>
          <p>
            There are no perfect words, no right answers.
            Just be honest with yourself.
          </p>
        </div>
        <BookOpen size={65} className="journal-decoration" />
      </div>

      <div className="journal-actions">
        <button
          className="primary-button"
          onClick={() => openNewEntry("Free Writing")}
        >
          <Plus size={17} /> New journal entry
        </button>

        <button
          className="guided-button"
          onClick={() => openNewEntry("Guided Reflection")}
        >
          <Sparkles size={17} /> Guided reflection
        </button>
      </div>

      <section className="prompt-section">
        <span className="eyebrow">A QUESTION FOR YOUR INNER SELF</span>
        <h3>{prompts[new Date().getDate() % prompts.length]}</h3>
        <button
          className="text-button"
          onClick={() => {
            setPrompt(prompts[new Date().getDate() % prompts.length]);
            openNewEntry("Guided Reflection");
            setPrompt(prompts[new Date().getDate() % prompts.length]);
          }}
        >
          Explore this question <Feather size={15} />
        </button>
      </section>

      <div className="journal-list-heading">
        <div>
          <span className="eyebrow">YOUR COLLECTION</span>
          <h2>Past reflections</h2>
        </div>
        <span className="entry-count">{entries.length} entries</span>
      </div>

      <div className="journal-toolbar">
        <div className="journal-search">
          <Search size={17} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search your entries..."
          />
        </div>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="All">All categories</option>
          <option value="Personal">Personal</option>
          <option value="Fear">Fear</option>
          <option value="Strength">Strength</option>
          <option value="Reflection">Reflection</option>
        </select>
      </div>

      <div className="entries-list">
        {filteredEntries.length === 0 ? (
          <div className="journal-empty">
            <BookOpen size={37} />
            <h3>Your pages are waiting.</h3>
            <p>
              {entries.length === 0
                ? "Your first entry will begin a beautiful collection of discoveries."
                : "No entries match your search."}
            </p>
            {entries.length === 0 && (
              <button
                className="primary-button"
                onClick={() => openNewEntry()}
              >
                <Plus size={16} /> Write your first entry
              </button>
            )}
          </div>
        ) : (
          filteredEntries.map(entry => (
            <article className="journal-entry" key={entry.id}>
              <div className="entry-top">
                <span className="entry-category">{entry.category}</span>
                <span className="entry-date">{formatDate(entry.createdAt)}</span>
              </div>

              <h3>{entry.title}</h3>

              {entry.prompt && (
                <p className="entry-prompt">{entry.prompt}</p>
              )}

              <p className="entry-preview">{entry.content}</p>

              <div className="entry-bottom">
                <span className="entry-mood">✦ {entry.mood}</span>
                <span className="entry-mode">{entry.mode}</span>
                <div className="entry-controls">
                  <button onClick={() => editEntry(entry)} aria-label="Edit entry">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    aria-label="Delete entry"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {showEditor && (
        <div className="journal-modal-overlay">
          <div className="journal-modal">
            <div className="modal-header">
              <div>
                <span className="eyebrow">
                  {editingId ? "EDIT YOUR MEMORIES" : "A NEW PAGE BEGINS"}
                </span>
                <h2>{editingId ? "Edit entry" : "Write your story"}</h2>
              </div>
              <button
                className="modal-close"
                onClick={() => setShowEditor(false)}
                aria-label="Close editor"
              >
                <X size={21} />
              </button>
            </div>

            <div className="mode-switch">
              {["Free Writing", "Guided Reflection"].map(item => (
                <button
                  key={item}
                  className={mode === item ? "selected" : ""}
                  onClick={() => setMode(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {mode === "Guided Reflection" && (
              <div className="prompt-picker">
                <label>Choose a reflection question</label>
                <select value={prompt} onChange={e => setPrompt(e.target.value)}>
                  <option value="">Choose a question...</option>
                  {prompts.map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                {prompt && <p>{prompt}</p>}
              </div>
            )}

            <label>Entry title</label>
            <input
              className="editor-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Give this memory a title..."
            />

            <label>Your thoughts</label>
            <textarea
              className="editor-textarea"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write freely. This is your space..."
              rows={7}
            />

            <div className="editor-options">
              <div>
                <label>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  <option>Personal</option>
                  <option>Fear</option>
                  <option>Strength</option>
                  <option>Reflection</option>
                </select>
              </div>

              <div>
                <label>How do you feel?</label>
                <select value={mood} onChange={e => setMood(e.target.value)}>
                  {moods.map(item => <option key={item}>{item}</option>)}
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-button" onClick={() => setShowEditor(false)}>
                Cancel
              </button>
              <button className="primary-button" onClick={saveEntry}>
                <Save size={16} /> Save entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
