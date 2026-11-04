
import { useEffect, useState } from "react";
import {
  Moon, Plus, Pencil, Trash2, X, Save,
  Sparkles, ChevronRight, ShieldCheck
} from "lucide-react";
import "./Shadows.css";

const KEY = "beyond-veil-shadows";

const guidance = [
  {
    match: ["speak", "presentation", "public"],
    steps: [
      "Write down what makes speaking difficult.",
      "Practise explaining an idea privately.",
      "Share your thoughts with someone you trust.",
      "Try a small speaking opportunity when you're ready."
    ]
  },
  {
    match: ["failure", "fail", "mistake"],
    steps: [
      "Identify what you are worried might happen.",
      "Separate what you can control from what you cannot.",
      "Think of one small, manageable attempt.",
      "Treat mistakes as opportunities to learn."
    ]
  },
  {
    match: ["social", "people", "conversation", "talk"],
    steps: [
      "Think about situations where you feel comfortable.",
      "Start with a short conversation with someone you trust.",
      "Prepare a few conversation topics.",
      "Give yourself time to build confidence."
    ]
  },
  {
    match: ["exam", "test", "study"],
    steps: [
      "Break your preparation into smaller topics.",
      "Create a realistic study schedule.",
      "Practise questions one at a time.",
      "Take regular breaks and ask for help when needed."
    ]
  }
];

function getSuggestions(description) {
  const text = description.toLowerCase();
  const result = guidance.find(item =>
    item.match.some(word => text.includes(word))
  );

  return result?.steps || [
    "Write down exactly what worries you.",
    "Identify one thing that might make the situation easier.",
    "Consider discussing your concern with someone you trust.",
    "Choose one small, comfortable next step when you feel ready."
  ];
}

function loadShadows() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export default function Shadows() {
  const [shadows, setShadows] = useState(loadShadows);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [situation, setSituation] = useState("");
  const [intensity, setIntensity] = useState("Moderate");
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(shadows));
  }, [shadows]);

  function openForm(item = null) {
    setEditingId(item?.id || null);
    setTitle(item?.title || "");
    setDescription(item?.description || "");
    setSituation(item?.situation || "");
    setIntensity(item?.intensity || "Moderate");
    setShowForm(true);
  }

  function saveFear() {
    if (!title.trim() || !description.trim()) {
      alert("Please enter a title and describe your concern.");
      return;
    }

    const data = {
      id: editingId || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      situation: situation.trim(),
      intensity,
      suggestions: getSuggestions(description + " " + title),
      updatedAt: new Date().toISOString()
    };

    if (editingId) {
      setShadows(old => old.map(item =>
        item.id === editingId ? data : item
      ));
      setSelected(data);
    } else {
      setShadows(old => [data, ...old]);
    }

    setShowForm(false);
  }

  function removeFear(id) {
    if (window.confirm("Delete this entry?")) {
      setShadows(old => old.filter(item => item.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  }

  function toggleStep(id, index) {
    const key = `${id}-${index}`;
    setCompleted(old =>
      old.includes(key)
        ? old.filter(item => item !== key)
        : [...old, key]
    );
  }

  return (
    <div className="shadows-page">
      <div className="shadows-heading">
        <span className="eyebrow">THE HALL OF SHADOWS</span>
        <h1>Understand your <em>shadows.</em></h1>
        <p>
          Your fears are experiences to understand, not definitions
          of who you are.
        </p>
      </div>

      <div className="shadows-intro">
        <div>
          <Moon size={25} />
          <span className="eyebrow">THE KEEPER'S WISDOM</span>
          <h2>You are more than what worries you.</h2>
          <p>
            Explore your concerns with curiosity. You decide which
            steps feel comfortable and when you want to take them.
          </p>
        </div>
        <ShieldCheck size={65} className="shadow-decoration" />
      </div>

      <div className="shadows-summary">
        <div>
          <span className="eyebrow">YOUR COLLECTION</span>
          <h2>{shadows.length} recorded {shadows.length === 1 ? "concern" : "concerns"}</h2>
        </div>
        <button className="primary-button" onClick={() => openForm()}>
          <Plus size={17} /> Record a concern
        </button>
      </div>

      <div className="shadows-grid">
        {shadows.length === 0 ? (
          <div className="shadows-empty">
            <Moon size={38} />
            <h2>Your journey begins with understanding.</h2>
            <p>
              You haven't recorded anything yet. You can begin
              whenever you feel comfortable.
            </p>
            <button className="primary-button" onClick={() => openForm()}>
              <Plus size={16} /> Add your first entry
            </button>
          </div>
        ) : (
          shadows.map(item => (
            <article className="shadow-card" key={item.id}>
              <span className="shadow-label">✦ PERSONAL REFLECTION</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="shadow-meta">
                <span>{item.intensity} intensity</span>
              </div>
              <div className="shadow-card-actions">
                <button onClick={() => setSelected(item)}>
                  Explore guidance <ChevronRight size={15} />
                </button>
                <button aria-label="Edit" onClick={() => openForm(item)}>
                  <Pencil size={15} />
                </button>
                <button aria-label="Delete" onClick={() => removeFear(item.id)}>
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {selected && (
        <div className="shadow-detail">
          <div className="shadow-detail-heading">
            <div>
              <span className="eyebrow">THE KEEPER'S GUIDANCE</span>
              <h2>{selected.title}</h2>
            </div>
            <button onClick={() => setSelected(null)} aria-label="Close guidance">
              <X size={20} />
            </button>
          </div>

          <p className="shadow-detail-description">{selected.description}</p>

          {selected.situation && (
            <p className="shadow-situation">
              <strong>When it happens:</strong> {selected.situation}
            </p>
          )}

          <h3><Sparkles size={18} /> Ideas for your next steps</h3>

          <div className="suggestion-list">
            {selected.suggestions.map((step, index) => {
              const done = completed.includes(`${selected.id}-${index}`);

              return (
                <label className={`suggestion-item ${done ? "done" : ""}`} key={index}>
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => toggleStep(selected.id, index)}
                  />
                  <span>{step}</span>
                </label>
              );
            })}
          </div>

          <p className="guidance-note">
            You don't need to complete every step. Choose only what feels
            suitable. If a concern feels overwhelming, consider speaking
            with someone you trust or a qualified professional.
          </p>
        </div>
      )}

      {showForm && (
        <div className="journal-modal-overlay">
          <div className="journal-modal">
            <div className="modal-header">
              <div>
                <span className="eyebrow">A MOMENT OF COURAGE</span>
                <h2>{editingId ? "Edit concern" : "Record a concern"}</h2>
              </div>
              <button className="modal-close" onClick={() => setShowForm(false)}>
                <X size={21} />
              </button>
            </div>

            <label>What would you like to explore?</label>
            <input
              className="editor-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Give your concern a name..."
            />

            <label>Describe your concern</label>
            <textarea
              className="editor-textarea"
              rows={5}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Write what you feel comfortable sharing..."
            />

            <label>When do you experience it? (Optional)</label>
            <input
              className="editor-input"
              value={situation}
              onChange={e => setSituation(e.target.value)}
              placeholder="Describe the situation..."
            />

            <label>How intense does it feel to you?</label>
            <select
              className="shadow-select"
              value={intensity}
              onChange={e => setIntensity(e.target.value)}
            >
              <option>Mild</option>
              <option>Moderate</option>
              <option>Strong</option>
            </select>

            <div className="modal-footer">
              <button className="cancel-button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button className="primary-button" onClick={saveFear}>
                <Save size={16} /> Save concern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
