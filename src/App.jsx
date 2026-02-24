import { useState, useEffect } from "react";
import { TrendingUp, Target, Zap, Moon, Sun } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { AviatorCalculator } from "./components/AviatorCalculator";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [sensitivity, setSensitivity] = useState(1);
  const [randomFactor, setRandomFactor] = useState(1);
  const [predictionRange, setPredictionRange] = useState(2);
  const [autoPredict, setAutoPredict] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(0);
  const [currentConfidence, setCurrentConfidence] = useState(0);
  const [savedPredictions, setSavedPredictions] = useState([]);

  // Calcul function - IZY IHANY NO TAZONINA
  const calculateNextMultiplier = () => {
    const baseMultiplier = Math.random() * (sensitivity + 0.5) + 0.5;
    const confidenceLevel = Math.random() * (randomFactor + 0.3) + 0.2;
    return { predicted: baseMultiplier, confidence: confidenceLevel * 100 };
  };
  
  const calculateProbability = (multiplier) => {
    return Math.min(95, Math.max(5, 100 - multiplier * 20));
  };
  
  const predictNext = () => {
    const result = calculateNextMultiplier();
    const probability = calculateProbability(result.predicted);
    
    // Create chart data
    const newPredictions = [];
    for (let i = 0; i < 5; i++) {
      newPredictions.push({
        time: i + 1,
        multiplier: Math.random() * 5 + 1,
        predicted: result.predicted + (Math.random() * 0.5 - 0.25)
      });
    }
    
    setPredictions(newPredictions);
    setCurrentMultiplier(result.predicted);
    setCurrentConfidence(probability);
  };
  
  const savePrediction = () => {
    const newSaved = {
      id: Date.now(),
      multiplier: currentMultiplier,
      confidence: currentConfidence,
      timestamp: new Date().toISOString()
    };
    setSavedPredictions([...savedPredictions, newSaved]);
  };

  // Auto-predict effect
  useEffect(() => {
    if (autoPredict) {
      const interval = setInterval(predictNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoPredict, sensitivity, randomFactor]);

  // Historical data
  const historicalChartData = [
    { time: "12:00", multiplier: 2.3 },
    { time: "12:05", multiplier: 1.8 },
    { time: "12:10", multiplier: 3.2 },
    { time: "12:15", multiplier: 2.7 },
    { time: "12:20", multiplier: 4.1 },
    { time: "12:25", multiplier: 2.9 }
  ];

  // Chart data for predictions
  const chartData = predictions.map((pred, index) => ({
    name: `Game ${index + 1}`,
    actual: pred.multiplier,
    predicted: pred.predicted
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Boss Bet
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Calculator & Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calculator */}
            <AviatorCalculator
              multiplier={currentMultiplier || 1.0}
              confidence={currentConfidence || 75}
              onPredict={predictNext}
              onSave={savePrediction}
            />

            {/* Chart */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Prediction History</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Line type="monotone" dataKey="actual" stroke="#22c55e" strokeWidth={2} />
                    <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column - Settings & History */}
          <div className="space-y-6">
            {/* Settings */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Calculator Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-gray-300">Sensitivity</label>
                  <input
                    type="range"
                    min={0.5}
                    max={3}
                    step={0.1}
                    value={sensitivity}
                    onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300">Random Factor</label>
                  <input
                    type="range"
                    min={0.1}
                    max={2}
                    step={0.1}
                    value={randomFactor}
                    onChange={(e) => setRandomFactor(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300">Prediction Range</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={predictionRange}
                    onChange={(e) => setPredictionRange(parseInt(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">Auto-predict</label>
                  <button
                    onClick={() => setAutoPredict(!autoPredict)}
                    className={`w-12 h-6 rounded-full transition-colors ${autoPredict ? 'bg-green-600' : 'bg-gray-600'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${autoPredict ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Multipliers */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Multipliers</h3>
              <div className="space-y-2">
                {historicalChartData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-700/50 rounded-lg">
                    <span className="text-gray-300">{item.time}</span>
                    <span className="font-bold text-green-500">{item.multiplier}x</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
