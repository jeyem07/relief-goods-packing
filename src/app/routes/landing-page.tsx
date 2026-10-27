import { useNavigate } from 'react-router-dom'
import { Package, Zap, Target, ArrowRight } from 'lucide-react'
import { useTour } from '@/features/tour/hooks/use-tour'
import { usePacking } from '@/features/packing/hooks/use-packing'
import { useSystemTheme } from '@/hooks/use-system-theme'

export default function LandingPage() {
  useSystemTheme()
  const navigate = useNavigate()
  const p = usePacking()
  
  const tour = useTour({
    reset: () => {
      p.loadSample()
      p.setCapacityKg(50)
      p.setMethod('best')
    },
    setMethod: p.setMethod,
  })

  const handleGetStarted = () => {
    navigate('/app')
    // Small delay to let the page render before starting tour
    setTimeout(() => {
      tour.start()
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <div className="px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-black dark:bg-white rounded-2xl mb-8">
            <Package className="w-10 h-10 text-white dark:text-black" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Pack Buddy
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Optimize your disaster relief supplies. Pack the most important items while staying within weight limits.
          </p>
          
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Features & Computational Complexity Topics</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
            This app demonstrates key concepts from Module VIII: Computational Complexity through the classic 0/1 Knapsack Problem
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 - Exponential Growth */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Exponential Growth (2ⁿ)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Watch the "Ways to pack" counter double with each item added. Demonstrates why brute force is impossible.
              </p>
              <div className="inline-block px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs font-medium rounded-full">
                Time Complexity
              </div>
            </div>

            {/* Feature 2 - Dynamic Programming */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Best Pack (n × W)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Dynamic programming finds optimal solution. Pseudo-polynomial time - fast for reasonable capacities.
              </p>
              <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                Pseudo-Polynomial
              </div>
            </div>

            {/* Feature 3 - Approximation */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Quick Pack (n log n)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Greedy approximation algorithm. Polynomial time, usually close to optimal. Compare results with Best Pack.
              </p>
              <div className="inline-block px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                Approximation Algorithm
              </div>
            </div>

            {/* Feature 4 - NP Class */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Easy to Verify</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Given a solution, verifying it fits is fast (polynomial time). Shows the problem is in NP.
              </p>
              <div className="inline-block px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                Class NP
              </div>
            </div>

            {/* Feature 5 - NP-Complete */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Decision Version</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                "Is there a load worth at least K?" The yes/no version is NP-Complete. Reduces from Subset Sum.
              </p>
              <div className="inline-block px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full">
                NP-Complete
              </div>
            </div>

            {/* Feature 6 - NP-Hard */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Optimization Version</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                "Find the maximum value load" is NP-Hard. At least as hard as any NP-Complete problem.
              </p>
              <div className="inline-block px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full">
                NP-Hard
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem Section */}
      <div className="px-6 py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">The 0/1 Knapsack Problem</h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            A classic NP-Complete optimization problem: Which items should you pack to maximize total importance while staying within weight capacity?
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Why It's Hard</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Each item = yes/no choice → 2ⁿ possible combinations</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>12 items = 4,096 possibilities; 20 items = 1 million+</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>No known polynomial-time exact algorithm</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Verification is fast, but finding is hard (NP-Complete)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">How We Solve It</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span><strong>Best Pack:</strong> Dynamic programming (pseudo-polynomial)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    <span><strong>Quick Pack:</strong> Greedy approximation (polynomial)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span>Fast verification to check any proposed solution</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>Reducible from Subset Sum (polynomial reduction)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How to Use the App</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Set Your Capacity</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter how much weight (in kg) your vehicle can carry. Watch how capacity affects the algorithm's table size (pseudo-polynomial behavior).
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Add Your Items</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  List relief items with their weight and importance rating (1-10). Each item doubles the search space - demonstrating exponential growth.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Compare Algorithms</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Toggle between Best Pack (optimal) and Quick Pack (approximation). See the time-quality tradeoff in action.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-center text-gray-600 dark:text-gray-400 mb-2">
          <strong>Course:</strong> Module VIII - Computational Complexity
        </p>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          Topics: Time & Space Complexity • P, NP, NP-Complete, NP-Hard • Polynomial Reduction • Approximation Algorithms
        </p>
      </div>
    </div>
  )
}
