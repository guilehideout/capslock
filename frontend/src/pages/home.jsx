export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4">
      <h1 className="text-3xl font-semibold mb-4">File Sharing</h1>
      <p className="text-center text-gray-600 max-w-md mb-8">
        Quickly share files with others by creating a room or joining an existing one.  
        No sign-up required — just simple and fast file transfers.
      </p>

      <div className="space-y-4 w-half max-w-xs">
        <a href="/create-room">
          <button className="w-full py-3 px-4 my-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Create Room
          </button>
        </a>

        <a href="/join-room">
          <button className="w-full py-3 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">
            Join Room
          </button>
        </a>
      </div>
    </div>
  );
}