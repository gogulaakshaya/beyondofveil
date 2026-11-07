import { useEffect, useState } from "react";
import {
  Flower2,
  Plus,
  Trash2,
  Sparkles,
  X,
  Sprout,
} from "lucide-react";
import "./PersonalSections.css";

const STORAGE_KEY = "beyond-veil-strengths";

const suggestions = [
  "Kindness",
  "Creativity",
  "Patience",
  "Curiosity",
  "Courage",
  "Honesty",
  "Determination",
  "Empathy",
  "Problem-solving",
  "Leadership",
];

function loadItems() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export default function Strengths() {
  const [strengths, setStrengths] = useState(loadItems);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(strengths));
  }, [strengths]);

  function addStrength(event) {
    event.preventDefault();
    if (!name.trim()) return;

    const newStrength = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      category,
      date: new Date().toISOString(),
    };

    setStrengths(current => [newStrength, ...current]);
    setName("");
    setDescription("");
    setCategory("Personal");
    setShowForm(false);
  }

  function deleteStrength(id) {
    setStrengths(current => current.filter(item => item.id !== id));
    setSelected(null);
  }

  const flowerStyles = [
    "garden-flower-rose",
    "garden-flower-lavender",
    "garden-flower-gold",
    "garden-flower-blue",
    "garden-flower-pink",
    "garden-flower-white",
  ];

  return (
    <div className="personal-section strengths-section">
      <header className="garden-hero">
        <div className="garden-hero-decoration">✧ ❀ ✧</div>
        <span className="personal-kicker">THE GARDEN OF YOUR GIFTS</span>
        <h1>Your Enchanted Garden</h1>
        <p>
          Every quality you nurture becomes something beautiful.
          Discover the strengths that make you who you are.
        </p>

        <div className="garden-count">
          <Flower2 size={22} />
          <div>
            <strong>{strengths.length}</strong>
            <span>Flowers in your garden</span>
          </div>
        </div>
      </header>

      <div className="garden-scene">
        <div className="garden-scene-heading">
          <div>
            <span className="personal-kicker">A PLACE TO BLOOM</span>
            <h2>The Garden of Becoming</h2>
          </div>

          <button
            className="garden-add-button"
            onClick={() => setShowForm(value => !value)}
          >
            {showForm ? <X size={17} /> : <Plus size={17} />}
            {showForm ? "CLOSE" : "PLANT A FLOWER"}
          </button>
        </div>

        {showForm && (
          <section className="garden-form-panel">
            <div className="garden-form-heading">
              <Sprout size={22} />
              <div>
                <h3>Plant a New Seed</h3>
                <p>Give a quality of yours room to grow.</p>
              </div>
            </div>

            <form onSubmit={addStrength} className="personal-form">
              <label>
                NAME OF YOUR STRENGTH
                <input
                  value={name}
                  onChange={event => setName(event.target.value)}
                  placeholder="Example: Creativity"
                  maxLength={60}
                  required
                />
              </label>

              <label>
                WHEN HAVE YOU USED THIS STRENGTH?
                <textarea
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                  placeholder="Describe a moment when this quality helped you..."
                  rows={3}
                  maxLength={500}
                />
              </label>

              <label>
                CATEGORY
                <select
                  value={category}
                  onChange={event => setCategory(event.target.value)}
                >
                  <option>Personal</option>
                  <option>Learning</option>
                  <option>Relationships</option>
                  <option>Creativity</option>
                  <option>Everyday Life</option>
                </select>
              </label>

              <button className="garden-submit" type="submit">
                <Flower2 size={17} /> PLANT IN MY GARDEN
              </button>
            </form>

            <div className="garden-suggestions">
              <span>NEED SOME INSPIRATION?</span>
              <div>
                {suggestions.map(item => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setName(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {strengths.length === 0 ? (
          <div className="garden-empty">
            <div className="empty-flower">✿</div>
            <h3>A garden waiting to bloom</h3>
            <p>
              Your first flower is waiting to grow.
              Add a strength and begin your collection.
            </p>
            <button
              className="garden-add-button"
              onClick={() => setShowForm(true)}
            >
              <Plus size={17} /> PLANT YOUR FIRST FLOWER
            </button>
          </div>
        ) : (
          <>
            <div className="garden-landscape">
              <div className="garden-moon">☾</div>
              <div className="garden-stars">✦　 ·　 ✧　　✦　 ·　 ✧</div>
              <div className="garden-hill garden-hill-back" />
              <div className="garden-hill garden-hill-front" />

              <div className="garden-flowers">
                {strengths.map((item, index) => (
                  <button
                    key={item.id}
                    className={`garden-flower ${flowerStyles[index % flowerStyles.length]}`}
                    onClick={() => setSelected(item)}
                    title={`Explore ${item.name}`}
                  >
                    <span className="flower-bloom">
                      {index % 3 === 0 ? "✿" : index % 3 === 1 ? "❀" : "✽"}
                    </span>
                    <span className="flower-stem" />
                    <span className="flower-leaf flower-leaf-left" />
                    <span className="flower-leaf flower-leaf-right" />
                    <span className="flower-name">{item.name}</span>
                  </button>
                ))}
              </div>

              <div className="garden-ground-label">
                ✧ GROW AT YOUR OWN PACE ✧
              </div>
            </div>

            <p className="garden-hint">
              <Sparkles size={14} /> Select any flower to discover its story.
            </p>
          </>
        )}
      </div>

      {selected && (
        <div className="garden-detail">
          <button
            className="garden-detail-close"
            onClick={() => setSelected(null)}
            aria-label="Close strength details"
          >
            <X size={18} />
          </button>

          <span className="personal-kicker">A FLOWER IN YOUR GARDEN</span>
          <div className="garden-detail-flower">✿</div>
          <span className="garden-detail-category">{selected.category}</span>
          <h2>{selected.name}</h2>
          <p>
            {selected.description || "A quality worth remembering and nurturing."}
          </p>
          <span className="garden-detail-date">
            DISCOVERED {new Date(selected.date).toLocaleDateString()}
          </span>

          <button
            className="garden-delete-button"
            onClick={() => deleteStrength(selected.id)}
          >
            <Trash2 size={15} /> REMOVE FLOWER
          </button>
        </div>
      )}

      <div className="garden-footer">
        <span>✧</span>
        Every strength begins as a little seed.
        <span>✧</span>
      </div>
    </div>
  );
}