export default function Header() {
  return (
    <header className="fixed top-0 w-full glass z-50">
      <div className="max-w-7xl mx-auto flex justify-between p-4">
        <h1 className="font-bold text-xl">CV Maker</h1>

        <nav className="hidden md:flex gap-6">
          <a href="/templates">Templates</a>
          <a href="/pricing">Pricing</a>
        </nav>

        <button className="bg-primary text-white px-4 py-2 rounded-md">
          Start Now
        </button>
      </div>
    </header>
  );
}