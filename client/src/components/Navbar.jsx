export default function Navbar({ user, onLogout }) {
  return (
    <div className="nav">
      <h1 className="title">Simple CRUD App Frontend</h1>
      <p className="welcome-text">Welcome {user?.username || 'User'}!</p>
      <button
        type="button"
        onClick={onLogout}
      >
        Log Out
      </button>
    </div>
  );
}

