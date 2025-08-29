function App() {
  return (
    // <>
    //   <HomePage />
    // </>
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        🌱 Community Mangrove Watch
      </h1>
      <p className="text-gray-700 max-w-md text-center mb-6">
        Report mangrove cutting, dumping, and threats in your community.
        Together we can protect our coasts.
      </p>
      <button className="px-6 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition">
        Report Incident
      </button>
    </div>
  )
}

export default App
