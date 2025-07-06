// const Navbar = () => {

//     const Navlinks = [
//         { name: 'Home', path: '/' },
//         { name: 'Tasks', path: '/tasks' },
//         { name: 'Add Task', path: '/add' },
//         { name: 'Statistics', path: '/stats' },
//     ];

//     return (
//         <nav className="flex items-center justify-between bg-white p-4 shadow-md fixed top-0 left-0 right-0 ">
//             <h1 className="text-xl font-bold text-purple-700">DevTasks 🚀</h1>
//             <div className="flex gap-6">
//             {Navlinks.map((Link,index)=>{
//                 return (
//                     <a
//                         key={index}
//                         href={Link.path}
//                         className="text-gray-700 hover:text-purple-600 transition-colors font-semibold text-md"
//                     >
//                         {Link.name}
//                     </a>
//                 )
//             })}
//             </div>
//         </nav>
//     )
// }

// export default Navbar;

"use client"

import { useState, useEffect } from "react"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("")
  const Navlinks = [
        { name: 'Home', path: '/' },
        { name: 'Tasks', path: '/tasks' },
        { name: 'Add Task', path: '/add' },
        // { name: 'Statistics', path: '/stats' },
    ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setActiveLink(window.location.pathname)
  }, [])

  return (
    <>
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-xl shadow-purple-500/10 border-b border-white/20"
            : "bg-white/90 backdrop-blur-lg shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                DevTasks
              </h1>
              <span className="ml-2 text-2xl animate-bounce">🚀</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {Navlinks.map((link, index) => {
                const isActive = activeLink === link.path
                return (
                  <a
                    key={index}
                    href={link.path}
                    onClick={() => setActiveLink(link.path)}
                    className={`relative px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-purple-500/30"
                        : "text-gray-700 hover:text-purple-600 hover:bg-purple-50 hover:-translate-y-0.5"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full mt-2"></div>
                    )}
                  </a>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className="p-2 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                onClick={() => {
                  // Toggle mobile menu logic here
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative gradient line */}
        <div className="h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  )
}

export default Navbar
