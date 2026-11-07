
import { useState, useEffect } from "react";
import {
  Moon, BookOpen, Eye, Flower2, Sparkles,
  Archive, Settings, Search, Bell, Menu,
  ChevronRight, Feather, CalendarDays,
  Mail, LockKeyhole, UserRound, EyeOff, ArrowLeft, LogOut
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

// Safely read saved data from localStorage
function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function AuthPage({ mode, setMode, accounts, setAccounts, onLogin, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const isRegister = mode === "register";

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (isRegister) {
      if (!name.trim() || !cleanEmail || !password || !confirmPassword) {
        setError("Every field is required to enter the registry.");
        return;
      }

      if (password.length < 6) {
        setError("Your password must contain at least 6 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("The two passwords do not match.");
        return;
      }

      if (accounts.some((account) => account.email === cleanEmail)) {
        setError("An account with this email already exists. Try logging in.");
        return;
      }

      const newAccount = {
        name: name.trim(),
        email: cleanEmail,
        password,
      };

      const updatedAccounts = [...accounts, newAccount];

      setAccounts(updatedAccounts);
      localStorage.setItem("veil_accounts", JSON.stringify(updatedAccounts));

      onLogin({
        name: newAccount.name,
        email: newAccount.email,
      });

      return;
    }

    const account = accounts.find(
      (item) =>
        item.email === cleanEmail &&
        item.password === password
    );

    if (!account) {
      setError("The credentials do not match our records. Check them and try again.");
      return;
    }

    onLogin({
      name: account.name,
      email: account.email,
    });
  }

  return (
    <main className="auth-screen">
      <div className="auth-backdrop" />
      <div className="auth-moon" />
      <div className="auth-vignette" />

      <button
        className="auth-back-button"
        type="button"
        onClick={onBack}
      >
        <ArrowLeft size={16} /> RETURN TO THE GATES
      </button>

      <section className="auth-layout">
        <div className="auth-story">
          <span className="auth-kicker">✦ THE KEEPERS' INVITATION ✦</span>

          <h1>
            BEYOND<br />
            <em>THE VEIL</em>
          </h1>

          <div className="auth-ornament">☽ ━━━━━ ✦ ━━━━━ ☾</div>

          <p className="auth-quote">
            “Not every shadow is a threat.<br />
            Some are waiting to be understood.”
          </p>

          <span className="auth-signature">— THE KEEPER</span>

          <div className="auth-warning">
            <span className="warning-mark">✧</span>
            <span>THE WORLD REMEMBERS THOSE WHO ENTER.</span>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-top">
            <span className="auth-seal">☽</span>
            <span className="auth-card-eyebrow">THE FORBIDDEN REGISTER</span>

            <h2>
              {isRegister ? "Claim Your Identity" : "You Have Returned"}
            </h2>

            <p>
              {isRegister
                ? "Write your name into the ancient records."
                : "The gates recognize your presence, Seeker."}
            </p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={!isRegister ? "selected" : ""}
              onClick={() => {
                setMode("login");
                setError("");
                setMessage("");
              }}
            >
              LOGIN
            </button>

            <button
              type="button"
              className={isRegister ? "selected" : ""}
              onClick={() => {
                setMode("register");
                setError("");
                setMessage("");
              }}
            >
              REGISTER
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && (
              <label className="auth-field">
                <span>YOUR NAME</span>

                <div className="auth-input-wrap">
                  <UserRound size={17} />

                  <input
                    type="text"
                    placeholder="The name you wish to be known by"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
              </label>
            )}

            <label className="auth-field">
              <span>EMAIL ADDRESS</span>

              <div className="auth-input-wrap">
                <Mail size={17} />

                <input
                  type="email"
                  placeholder="seeker@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </label>

            <label className="auth-field">
              <span>SECRET PASSWORD</span>

              <div className="auth-input-wrap">
                <LockKeyhole size={17} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  required
                />

                <button
                  className="password-toggle"
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>

            {isRegister && (
              <label className="auth-field">
                <span>CONFIRM YOUR PASSWORD</span>

                <div className="auth-input-wrap">
                  <LockKeyhole size={17} />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter it once more"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </label>
            )}

            {error && (
              <p className="auth-feedback auth-error" role="alert">
                {error}
              </p>
            )}

            {message && (
              <p className="auth-feedback auth-success" role="status">
                {message}
              </p>
            )}

            <button className="auth-submit" type="submit">
              <span>
                {isRegister ? "SEAL YOUR NAME" : "CROSS THE THRESHOLD"}
              </span>
              <ChevronRight size={18} />
            </button>
          </form>

          <p className="auth-switch">
            {isRegister
              ? "Already have an identity?"
              : "A stranger to these halls?"}{" "}

            <button
              type="button"
              onClick={() => {
                setMode(isRegister ? "login" : "register");
                setError("");
                setMessage("");
              }}
            >
              {isRegister ? "Return to Login" : "Create an account"}
            </button>
          </p>

          <div className="auth-card-footer">
            ✦ YOUR JOURNEY BEGINS WITHIN ✦
          </div>
        </div>
      </section>
    </main>
  );
}

function Sidebar({ active, setActive, open, setOpen, user, onLogout }) {
  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <Moon size={23} />
          </div>

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
            <div className="avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{user.name}</strong>
              <span>Your journey begins</span>
            </div>
          </div>

          <button className="logout-button" onClick={onLogout}>
            <LogOut size={16} /> Leave the sanctuary
          </button>
        </div>
      </aside>
    </>
  );
}

function Dashboard({ setActive, user }) {
  return (
    <>
      <div className="welcome">
        <span className="eyebrow">✦ A NEW CHAPTER AWAITS ✦</span>

        <h1>
          Your story is still<br />
          <em>unfolding.</em>
        </h1>

        <p>Every shadow has a story. Every strength has a purpose.</p>
      </div>

      <section className="keeper-card">
        <div className="keeper-content">
          <span className="eyebrow">A MESSAGE FROM THE KEEPER</span>

          <h2>Welcome, {user.name}.</h2>

          <p>
            The journey within is the greatest mystery of all.
            Take a moment to discover something new about yourself today.
          </p>

          <button
            className="primary-button"
            onClick={() => setActive("My Journal")}
          >
            <Feather size={17} />
            Begin your reflection
            <ChevronRight size={17} />
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
            {
              name: "My Journal",
              subtitle: "Your thoughts, safely kept.",
              icon: BookOpen,
              number: "01",
            },
            {
              name: "My Shadows",
              subtitle: "Understand your fears.",
              icon: Eye,
              number: "02",
            },
            {
              name: "My Strengths",
              subtitle: "Discover what makes you strong.",
              icon: Flower2,
              number: "03",
            },
            {
              name: "Growth Path",
              subtitle: "Take your next small step.",
              icon: Sparkles,
              number: "04",
            },
          ].map(({ name, subtitle, icon: Icon, number }) => (
            <button
              className="feature-card"
              key={name}
              onClick={() => setActive(name)}
            >
              <span className="card-number">{number}</span>
              <Icon size={27} className="feature-icon" />
              <h3>{name}</h3>
              <p>{subtitle}</p>
              <span className="card-arrow">
                <ChevronRight size={19} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="reflection-card">
        <div className="reflection-icon">
          <CalendarDays size={21} />
        </div>

        <div>
          <span className="eyebrow">TODAY'S REFLECTION</span>
          <h3>What is one thing you appreciate about yourself?</h3>
          <p>
            A small moment of reflection can reveal something meaningful.
          </p>
        </div>

        <button
          className="text-button"
          onClick={() => setActive("My Journal")}
        >
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
      <span className="eyebrow">
        BEYOND THE VEIL · {page.toUpperCase()}
      </span>

      <h1>{details.title}</h1>
      <p>{details.description}</p>

      <div className="empty-card">
        <Sparkles size={32} />
        <h2>Your journey starts here.</h2>

        <p>
          This space is ready for its next chapter. We'll build its full
          functionality in our upcoming development stages.
        </p>

        <button
          className="primary-button"
          onClick={() => setActive("Dashboard")}
        >
          Return to dashboard <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}

function App() {
  const [active, setActive] = useState("Dashboard");
  const [open, setOpen] = useState(false);

  // Restore saved account information
  const [accounts, setAccounts] = useState(() =>
    readStorage("veil_accounts", [])
  );

  // Restore the logged-in user
  const [user, setUser] = useState(() =>
    readStorage("veil_user", null)
  );

  const [entered, setEntered] = useState(() =>
    Boolean(readStorage("veil_user", null))
  );

  const [authMode, setAuthMode] = useState("login");

  // Save registered accounts whenever they change
  useEffect(() => {
    localStorage.setItem("veil_accounts", JSON.stringify(accounts));
  }, [accounts]);

  // Save or remove the current login session
  useEffect(() => {
    if (user) {
      localStorage.setItem("veil_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("veil_user");
    }
  }, [user]);

  function handleLogout() {
    setUser(null);
    setAuthMode("login");
    setActive("Dashboard");
    setOpen(false);
    setEntered(true);
  }

  if (!entered) {
    return (
      <div className="intro-screen">
        <video className="intro-video" autoPlay muted loop playsInline>
          <source src="/videos/veil-intro.mp4" type="video/mp4" />
        </video>

        <div className="intro-overlay" />

        <div className="intro-content">
          <span className="intro-eyebrow">
            ✦ THE WORLD BEYOND YOURSELF ✦
          </span>

          <h1>
            BEYOND<span>THE VEIL</span>
          </h1>

          <div className="intro-divider">☽ ✦ ☾</div>

          <p>
            Some doors reveal worlds.<br />
            Others reveal the soul within.
          </p>

          <span className="keeper-message">
            "I have been waiting for you, Seeker."
            <br />
            — THE KEEPER
          </span>

          <button
            className="enter-button"
            onClick={() => {
              setAuthMode("login");
              setEntered(true);
            }}
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

  if (!user) {
    return (
      <AuthPage
        mode={authMode}
        setMode={setAuthMode}
        accounts={accounts}
        setAccounts={setAccounts}
        onLogin={setUser}
        onBack={() => setEntered(false)}
      />
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        active={active}
        setActive={setActive}
        open={open}
        setOpen={setOpen}
        user={user}
        onLogout={handleLogout}
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

            <div className="top-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="page-content">
          {active === "Dashboard" ? (
            <Dashboard setActive={setActive} user={user} />
          ) : active === "My Journal" ? (
            <Journal />
          ) : active === "My Shadows" ? (
            <Shadows />
          ) : (
            <OtherPage page={active} setActive={setActive} />
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
