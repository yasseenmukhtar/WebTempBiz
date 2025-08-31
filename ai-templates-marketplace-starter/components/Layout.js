export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow p-4">
        <div className="max-w-5xl mx-auto flex justify-between">
          <h1 className="font-bold">AI Templates Marketplace</h1>
          <nav>
            <a className="mr-4" href="/">Shop</a>
            <a className="mr-4" href="/admin/upload">Admin</a>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-6">{children}</main>
      <footer className="text-center p-6 text-sm text-gray-500">© Your Marketplace</footer>
    </div>
  );
}
