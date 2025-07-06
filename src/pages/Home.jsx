"use client"
import Particles from "../components/Particles"

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 relative overflow-hidden">
      {/* Background Particles - Fixed positioning to cover entire viewport */}
      <div className="fixed inset-10 w-full h-full z-1">
        <Particles
          particleColors={["#ffffff", "#e2e8f0", "#cbd5e1"]}
          particleCount={250}
          particleSpread={15}
          speed={0.1}
          particleBaseSize={90}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>


      {/* Main Content - Higher z-index to appear above particles */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              Stay Organized.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Code Better.
              </span>
            </h1>
          </div>

          {/* Description */}
          <div className="mb-12">
            <p className="text-xl md:text-2xl text-slate-300 mb-6 leading-relaxed drop-shadow-md">
              Manage your developer tasks with{" "}
              <span className="font-semibold text-white bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                DevTasks
              </span>{" "}
              — a sleek, minimal task tracker designed specifically for coders.
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto drop-shadow-sm">
              Prioritize, track, and complete tasks with smart features like tags, deadlines, and progress stats.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="text-white font-semibold mb-2">Built for devs</h3>
              <p className="text-slate-400 text-sm">Designed with developer workflows in mind</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-white font-semibold mb-2">Works offline</h3>
              <p className="text-slate-400 text-sm">Keep coding even without internet</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-white font-semibold mb-2">No sign-up needed</h3>
              <p className="text-slate-400 text-sm">Start using immediately, no barriers</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="my-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <span className="text-3xl mr-3 animate-bounce">🚀</span>
              <span className="text-2xl font-semibold text-white drop-shadow-lg">Start managing your tasks today.</span>
            </div>

            {/* Gradient Button with Glass Effect */}
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 inline-flex items-center backdrop-blur-sm border border-white/20"
              onClick={() => (window.location.href = "/add")}
            >
              <span className="text-xl mr-2">💻</span>
              Add Your First Task
            </button>

            {/* Secondary Action */}
            <div className="mt-6">
              <button
                className="text-slate-300 hover:text-white font-medium px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
                onClick={() => (window.location.href = "/tasks")}
              >
                View All Tasks →
              </button>
            </div>
          </div>

          {/* Stats or Additional Info */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">Fast</div>
              <div className="text-sm text-slate-400">Lightning quick</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">Simple</div>
              <div className="text-sm text-slate-400">Easy to use</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400 mb-1">Smart</div>
              <div className="text-sm text-slate-400">Intelligent features</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">Free</div>
              <div className="text-sm text-slate-400">Always free</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl"></div>
      </div>
    </div>
  )
}

export default Home
