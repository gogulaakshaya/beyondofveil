
import { useState } from "react";
import {
  Moon, BookOpen, Eye, Flower2, Sparkles,
  Archive, Settings, Search, Bell, Menu,
  Plus, ChevronRight, Feather, CalendarDays
} from "lucide-react";
import "./App.css";
import Journal from "./pages/Journal";
import Shadows from "./pages/Shadows";

const navigation = [
  { name: "Dashboard", icon: Moon },
  { name: "My Journal", icon: BookOpen },
  { name: "My Shadows", icon: Eye },
  { name: "My Strengths", icon: Flower2 },
  { name: "Growth Path", icon: Sparkles },
  { name: "Archives", icon: Archive },
];

const pageDetails = {
  "My Journal": {
    title: "Your private journal",
    description: "A quiet place for your thoughts, feelings and discoveries.",
  },
  "My Shadows": {
    title: "Explore your shadows",
    description: "Understand the things that challenge you, one step at a time.",
  },
  "My Strengths": {
    title: "Discover your strengths",
    description: "Recognize the qualities and abilities you already possess.",
  },
  "Growth Path": {
    title: "Your growth journey",
    description: "Small steps can lead to meaningful personal growth.",
  },
  Archives: {
    title: "The ancient archives",
    description: "Explore the mysteries and stories of the world beyond the veil.",
  },
};

function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <>
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><Moon size={23} /></div>
          <div>
            <h2>BEYOND</h2>
            <span>THE VEIL</span>
          </div>
        </div>

        <div className="sidebar-label">YOUR SANCTUARY</div>

        <nav className="navigation">
          {navigation.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${active === name ? "active" : ""}`}
              onClick={() => {
                setActive(name);
                setOpen(false);
              }}
            >
              <Icon size={19} />
              <span>{name}</span>
              {active === name && <span className="active-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="quote-card">
            <Moon size={19} />
            <p>"Even the darkest night reveals a thousand stars."</p>
            <span>— THE KEEPER</span>
          </div>
          <button className="nav-item">
            <Settings size={19} />
            <span>Settings</span>
          </button>
          <div className="profile">
            <div className="avatar">S</div>
            <div>
              <strong>Seeker</strong>
              <span>Your journey begins</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Dashboard({ setActive }) {
  return (
    <>
      <div className="welcome">
        <span className="eyebrow">✦ A NEW CHAPTER AWAITS ✦</span>
        <h1>Your story is still<br /><em>unfolding.</em></h1>
        <p>Every shadow has a story. Every strength has a purpose.</p>
      </div>

      <section className="keeper-card">
        <div className="keeper-content">
          <span className="eyebrow">A MESSAGE FROM THE KEEPER</span>
          <h2>Welcome, Seeker.</h2>
          <p>
            The journey within is the greatest mystery of all.
            Take a moment to discover something new about yourself today.
          </p>
          <button className="primary-button" onClick={() => setActive("My Journal")}>
            <Feather size={17} /> Begin your reflection <ChevronRight size={17} />
          </button>
        </div>
        <div className="keeper-symbol">☽</div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR INNER WORLD</span>
            <h2>Explore your sanctuary</h2>
          </div>
          <span className="section-note">Choose your path</span>
        </div>

        <div className="feature-grid">
          {[
            { name: "My Journal", subtitle: "Your thoughts, safely kept.", icon: BookOpen, number: "01" },
            { name: "My Shadows", subtitle: "Understand your fears.", icon: Eye, number: "02" },
            { name: "My Strengths", subtitle: "Discover what makes you strong.", icon: Flower2, number: "03" },
            { name: "Growth Path", subtitle: "Take your next small step.", icon: Sparkles, number: "04" },
          ].map(({ name, subtitle, icon: Icon, number }) => (
            <button className="feature-card" key={name} onClick={() => setActive(name)}>
              <span className="card-number">{number}</span>
              <Icon size={27} className="feature-icon" />
              <h3>{name}</h3>
              <p>{subtitle}</p>
              <span className="card-arrow"><ChevronRight size={19} /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="reflection-card">
        <div className="reflection-icon"><CalendarDays size={21} /></div>
        <div>
          <span className="eyebrow">TODAY'S REFLECTION</span>
          <h3>What is one thing you appreciate about yourself?</h3>
          <p>A small moment of reflection can reveal something meaningful.</p>
        </div>
        <button className="text-button" onClick={() => setActive("My Journal")}>
          Reflect <ChevronRight size={16} />
        </button>
      </section>
    </>
  );
}

function OtherPage({ page, setActive }) {
  const details = pageDetails[page];

  return (
    <div className="other-page">
      <span className="eyebrow">BEYOND THE VEIL · {page.toUpperCase()}</span>
      <h1>{details.title}</h1>
      <p>{details.description}</p>
      <div className="empty-card">
        <Sparkles size={32} />
        <h2>Your journey starts here.</h2>
        <p>This space is ready for its next chapter. We'll build its full functionality in our upcoming development stages.</p>
        <button className="primary-button" onClick={() => setActive("Dashboard")}>
          Return to dashboard <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}


function App() {
  const [active, setActive] = useState("Dashboard");
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  // CINEMATIC INTRO SCREEN
  if (!entered) {
    return (
      <div className="intro-screen">

        <video
          className="intro-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/videos/veil-intro.mp4"
            type="video/mp4"
          />
        </video>

        <div className="intro-overlay"></div>

        <div className="intro-content">

          <span className="intro-eyebrow">
            ✦ THE WORLD BEYOND YOURSELF ✦
          </span>

          <h1>
            BEYOND
            <span>THE VEIL</span>
          </h1>

          <div className="intro-divider">☽ ✦ ☾</div>

          <p>
            Some doors reveal worlds.
            <br />
            Others reveal the soul within.
          </p>

          <span className="keeper-message">
            "I have been waiting for you, Seeker."
            <br />
            — THE KEEPER
          </span>

          <button
            className="enter-button"
            onClick={() => setEntered(true)}
          >
            ENTER THE VEIL <span>→</span>
          </button>

          <span className="intro-footer">
            DISCOVER · REFLECT · GROW
          </span>

        </div>
      </div>
    );
  }

  // EXISTING DASHBOARD
  return (
    <div className="app-shell">

      <Sidebar
        active={active}
        setActive={setActive}
        open={open}
        setOpen={setOpen}
      />

      <main className="main-content">

        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumb">
            YOUR SANCTUARY <span>/</span> {active.toUpperCase()}
          </div>

          <div className="topbar-actions">
            <button className="icon-button" aria-label="Search">
              <Search size={19} />
            </button>

            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
            </button>

            <div className="top-avatar">S</div>
          </div>
        </header>

        <div className="page-content">

          {active === "Dashboard" ? (
            <Dashboard setActive={setActive} />
          ) : active === "My Journal" ? (
            <Journal />
          ) : active === "My Shadows" ? (
            <Shadows />
          ) : (
            <OtherPage
              page={active}
              setActive={setActive}
            />
          )}

        </div>

        <footer className="footer">
          <span>☽ BEYOND THE VEIL</span>
          <span>DISCOVER · REFLECT · GROW</span>
        </footer>

      </main>
    </div>
  );
}


export default App;
