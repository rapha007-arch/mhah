export function AviatorCalculator({ multiplier, confidence, onPredict, onSave }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Aviator Calculator</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-400">Predicted Multiplier</p>
          <p className="text-3xl font-bold text-green-500">{multiplier.toFixed(2)}x</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Confidence</p>
          <p className="text-3xl font-bold text-blue-500">{confidence.toFixed(1)}%</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={onPredict}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Predict Next
        </button>
        <button 
          onClick={onSave}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}
