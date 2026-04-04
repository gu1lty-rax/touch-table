import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">My App</div>
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="hover:text-blue-400">Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-400">About</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-400">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}