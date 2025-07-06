import Squares from "../components/Squares";
import TiltedCard from "../components/TiltedCard";

const Home=()=>{
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                    Stay Organized.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        Code Better.
                    </span>
                    </h1>
                    </div>
                    {/* Description */}
                    <div className="mb-12">
                        <p className="text-xl md:text-2xl text-slate-300 mb-6 leading-relaxed">
                        Manage your developer tasks with <span className="font-semibold text-white">DevTasks</span> — a sleek,
                        minimal task tracker designed specifically for coders.
                        </p>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Prioritize, track, and complete tasks with smart features like tags, deadlines, and progress stats.
                        </p>
                        <div className="my-8 text-center">
                            <div className="flex items-center justify-center mb-6">
                                {/* 🚀 Icon as Emoji */}
                                <span className="text-3xl mr-3">🚀</span>
                                <span className="text-2xl font-semibold text-white">
                                Start managing your tasks today.
                                </span>
                            </div>

                            {/* Gradient Button */}
                            <button
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 inline-flex items-center"
                                onClick={() => window.location.href = "/add"}
                            >
                                {/* 💻 Emoji as Icon */}
                                <span className="text-xl mr-2">💻</span>
                                Add Your First Task
                            </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;