
import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  Circle,
  Flag,
  MapPin,
  Compass,
  Mountain,
  Castle,
  Trees,
  Sun,
  X,
} from "lucide-react";
import "./PersonalSections.css";

const STORAGE_KEY = "beyond-veil-growth";

function loadGoals() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

const landmarks = [
  { icon: Trees, name: "Whispering Woods", subtitle: "Where journeys begin" },
  { icon: Mountain, name: "The Golden Peaks", subtitle: "A challenge worth climbing" },
  { icon: Sun, name: "Valley of Light", subtitle: "A place for new discoveries" },
  { icon: Castle, name: "The Dreaming Castle", subtitle: "A destination of growth" },
];

export default function GrowthPath() {
  const [goals, setGoals] = useState(loadGoals);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stepInputs, setStepInputs] = useState({});
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  function addGoal(event) {
    event.preventDefault();
    if (!title.trim()) return;

    const newGoal = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      steps: [],
      date: new Date().toISOString(),
    };

    setGoals(current => [newGoal, ...current]);
    setTitle("");
    setDescription("");
    setShowForm(false);
    setSelectedGoal(newGoal.id);
  }

  function addStep(goalId) {
    const value = (stepInputs[goalId] || "").trim();
    if (!value) return;

    setGoals(current =>
      current.map(goal =>
        goal.id === goalId
          ? {
              ...goal,
              steps: [
                ...(goal.steps || []),
                {
                  id: Date.now(),
                  text: value,
                  completed: false,
                },
              ],
            }
          : goal
      )
    );

    setStepInputs(current => ({ ...current, [goalId]: "" }));
  }

  function toggleStep(goalId, stepId) {
    setGoals(current =>
      current.map(goal =>
        goal.id === goalId
          ? {
              ...goal,
              steps: (goal.steps || []).map(step =>
                step.id === stepId
                  ? { ...step, completed: !step.completed }
                  : step
              ),
            }
          : goal
      )
    );
  }

  function deleteGoal(goalId) {
    setGoals(current => current.filter(goal => goal.id !== goalId));
    setSelectedGoal(null);
  }

  const totalSteps = goals.reduce(
    (total, goal) => total + (goal.steps || []).length,
    0
  );

  const completedSteps = goals.reduce(
    (total, goal) =>
      total + (goal.steps || []).filter(step => step.completed).length,
    0
  );

  const overallProgress = totalSteps
    ? Math.round((completedSteps / totalSteps) * 100)
    : 0;

  const selected = goals.find(goal => goal.id === selectedGoal);

  return (
    <div className="personal-section growth-section illustrated-growth">

      <div className="personal-heading">
        <span className="personal-kicker">
          ✦ THE MAP OF BECOMING ✦
        </span>

        <h1>Your Growth Path</h1>

        <p>
          Every destination begins with a single step.
          Draw your own map, discover new places and celebrate
          every little milestone along the way.
        </p>
      </div>

      <div className="growth-overview">
        <div className="growth-stat">
          <Flag size={22} />
          <strong>{goals.length}</strong>
          <span>Destinations</span>
        </div>

        <div className="growth-stat">
          <CheckCircle2 size={22} />
          <strong>{completedSteps}</strong>
          <span>Milestones reached</span>
        </div>

        <div className="growth-stat">
          <Sparkles size={22} />
          <strong>{overallProgress}%</strong>
          <span>Journey progress</span>
        </div>
      </div>

      <section className="growth-map-panel">
        <div className="growth-map-heading">
          <div>
            <span className="personal-kicker">YOUR PERSONAL WORLD</span>
            <h2>The Lands of Becoming</h2>
            <p>Choose a destination on your map to explore its journey.</p>
          </div>

          <Compass size={35} />
        </div>

        <div className="illustrated-map">
          <div className="map-decoration map-sun">☼</div>
          <div className="map-decoration map-cloud cloud-one">☁</div>
          <div className="map-decoration map-cloud cloud-two">☁</div>
          <div className="map-decoration map-star star-one">✦</div>
          <div className="map-decoration map-star star-two">✧</div>
          <div className="map-decoration map-star star-three">✦</div>

          <svg
            className="map-route"
            viewBox="0 0 700 420"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 70 345 C 130 345, 115 260, 205 270 S 280 340, 350 255 S 430 160, 495 200 S 565 250, 625 95"
              fill="none"
              stroke="#b18b58"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="3 13"
            />
            <path
              d="M 70 345 C 130 345, 115 260, 205 270 S 280 340, 350 255 S 430 160, 495 200 S 565 250, 625 95"
              fill="none"
              stroke="#f8e8c5"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="3 13"
            />
          </svg>

          <div className="map-landmark landmark-forest">
            <Trees size={35} />
            <span>Whispering Woods</span>
          </div>

          <div className="map-landmark landmark-mountain">
            <Mountain size={38} />
            <span>Golden Peaks</span>
          </div>

          <div className="map-landmark landmark-valley">
            <Sun size={35} />
            <span>Valley of Light</span>
          </div>

          <div className="map-landmark landmark-castle">
            <Castle size={38} />
            <span>Dreaming Castle</span>
          </div>

          {goals.length === 0 ? (
            <div className="map-empty-message">
              <MapPin size={25} />
              <strong>Your adventure begins here</strong>
              <span>Create your first destination below.</span>
            </div>
          ) : (
            <div className="map-destinations">
              {goals.map((goal, index) => {
                const steps = goal.steps || [];
                const completed = steps.filter(
                  step => step.completed
                ).length;
                const finished =
                  steps.length > 0 && completed === steps.length;

                const positions = [
                  { left: "12%", top: "72%" },
                  { left: "30%", top: "53%" },
                  { left: "49%", top: "63%" },
                  { left: "68%", top: "37%" },
                  { left: "85%", top: "16%" },
                  { left: "25%", top: "18%" },
                ];

                const position = positions[index % positions.length];

                return (
                  <button
                    key={goal.id}
                    type="button"
                    className={`map-destination ${finished ? "destination-complete" : ""} ${selectedGoal === goal.id ? "destination-selected" : ""}`}
                    style={position}
                    onClick={() => setSelectedGoal(goal.id)}
                    title={goal.title}
                  >
                    {finished ? (
                      <CheckCircle2 size={23} />
                    ) : (
                      <MapPin size={23} />
                    )}
                    <span>{goal.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="map-compass">
            <Compass size={35} />
            <span>N</span>
          </div>

          <div className="map-footer-label">
            ✦ EVERY STEP TAKES YOU SOMEWHERE ✦
          </div>
        </div>

        <div className="map-legend">
          <span><i className="legend-dot legend-active" /> Active destination</span>
          <span><i className="legend-dot legend-complete" /> Completed destination</span>
        </div>
      </section>

      <div className="growth-create-row">
        <div>
          <span className="personal-kicker">CHART A NEW COURSE</span>
          <h2>Where would you like to go?</h2>
          <p>Turn something you wish to achieve into a destination.</p>
        </div>

        <button
          className="personal-primary growth-create-button"
          type="button"
          onClick={() => setShowForm(value => !value)}
        >
          {showForm ? <X size={17} /> : <Plus size={17} />}
          {showForm ? "CLOSE" : "ADD DESTINATION"}
        </button>
      </div>

      {showForm && (
        <section className="personal-panel growth-form-panel">
          <h2><Plus size={19} /> Create a Destination</h2>

          <p className="panel-description">
            Give your next chapter a name.
          </p>

          <form onSubmit={addGoal} className="personal-form">
            <label>
              DESTINATION NAME

              <input
                value={title}
                onChange={event => setTitle(event.target.value)}
                placeholder="Example: Learn a new skill"
                maxLength={100}
                required
              />
            </label>

            <label>
              WHY DOES THIS MATTER TO YOU?

              <textarea
                value={description}
                onChange={event => setDescription(event.target.value)}
                placeholder="Describe what you hope to discover..."
                rows={3}
                maxLength={500}
              />
            </label>

            <button className="personal-primary" type="submit">
              <Flag size={17} /> PLACE ON MY MAP
            </button>
          </form>
        </section>
      )}

      {selected && (
        <section className="growth-selected-panel">
          <div className="growth-selected-heading">
            <div>
              <span className="personal-kicker">DESTINATION DETAILS</span>
              <h2>{selected.title}</h2>
            </div>

            <button
              className="personal-delete"
              type="button"
              onClick={() => setSelectedGoal(null)}
              aria-label="Close destination details"
            >
              <X size={19} />
            </button>
          </div>

          {selected.description && (
            <p className="growth-description">
              {selected.description}
            </p>
          )}

          {(() => {
            const steps = selected.steps || [];
            const completed = steps.filter(step => step.completed).length;
            const progress = steps.length
              ? Math.round((completed / steps.length) * 100)
              : 0;

            return (
              <>
                <div className="growth-progress-label">
                  <span>JOURNEY PROGRESS</span>
                  <strong>{progress}%</strong>
                </div>

                <div className="growth-progress-track">
                  <div style={{ width: `${progress}%` }} />
                </div>

                <div className="growth-steps">
                  {steps.map(step => (
                    <button
                      type="button"
                      className={`growth-step ${step.completed ? "completed" : ""}`}
                      key={step.id}
                      onClick={() => toggleStep(selected.id, step.id)}
                    >
                      {step.completed
                        ? <CheckCircle2 size={18} />
                        : <Circle size={18} />}

                      <span>{step.text}</span>
                    </button>
                  ))}
                </div>

                {steps.length === 0 && (
                  <div className="growth-no-steps">
                    <Sparkles size={23} />
                    <p>Your destination is waiting for its first milestone.</p>
                  </div>
                )}

                <div className="growth-add-step">
                  <input
                    value={stepInputs[selected.id] || ""}
                    onChange={event =>
                      setStepInputs(current => ({
                        ...current,
                        [selected.id]: event.target.value,
                      }))
                    }
                    placeholder="Add your next small milestone..."
                    maxLength={150}
                    onKeyDown={event => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addStep(selected.id);
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => addStep(selected.id)}
                    aria-label="Add milestone"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div className="growth-selected-footer">
                  <span className="item-date">
                    JOURNEY BEGAN {new Date(selected.date).toLocaleDateString()}
                  </span>

                  <button
                    type="button"
                    className="growth-remove-goal"
                    onClick={() => deleteGoal(selected.id)}
                  >
                    <Trash2 size={15} /> Remove destination
                  </button>
                </div>
              </>
            );
          })()}
        </section>
      )}

      <section className="growth-landmarks">
        <div className="personal-list-heading">
          <div>
            <span className="personal-kicker">BEYOND THE HORIZON</span>
            <h2>Places Along Your Journey</h2>
          </div>
          <Sparkles size={23} />
        </div>

        <div className="growth-landmark-grid">
          {landmarks.map((landmark, index) => {
            const Icon = landmark.icon;

            return (
              <article className="growth-landmark-card" key={landmark.name}>
                <div className="growth-landmark-icon">
                  <Icon size={27} />
                </div>
                <span>LANDMARK {String(index + 1).padStart(2, "0")}</span>
                <h3>{landmark.name}</h3>
                <p>{landmark.subtitle}</p>
              </article>
            );
          })}
        </div>
      </section>

    </div>
  );
}
