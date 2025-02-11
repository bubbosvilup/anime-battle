export default function Battle() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="border-2 border-white p-6 w-3/4 max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-6">Battle Phase</h1>

        {/* Container per i duelli */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4">
            <div className="border-2 border-white p-4">Captain</div>
            <div className="border-2 border-white p-4">Vice Captain</div>
            <div className="border-2 border-white p-4">Healer</div>
            <div className="border-2 border-white p-4">Support</div>
            <div className="border-2 border-white p-4">Support</div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="border-2 border-white p-4">Captain</div>
            <div className="border-2 border-white p-4">Vice Captain</div>
            <div className="border-2 border-white p-4">Healer</div>
            <div className="border-2 border-white p-4">Support</div>
            <div className="border-2 border-white p-4">Support</div>
          </div>
        </div>

        {/* Divisorio */}
        <div className="border-t-2 border-white my-6"></div>

        {/* Battle Output */}
        <div className="border-2 border-white p-4 text-lg italic">
          Battle events will be displayed here...
        </div>
      </div>
    </div>
  );
}
