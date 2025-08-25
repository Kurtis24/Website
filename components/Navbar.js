"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              John Doe
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#work" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Work
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

