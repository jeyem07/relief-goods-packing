import { Package, Star, Layers } from "lucide-react";
import { Link } from "react-router-dom";

import { ItemsCard } from "@/features/packing/components/items-card";
import { HowItWorks } from "@/features/packing/components/how-it-works";
import { PackResult } from "@/features/packing/components/pack-result";
import { usePacking } from "@/features/packing/hooks/use-packing";
import { waysText } from "@/features/packing/utils/format";
import { useSystemTheme } from "@/hooks/use-system-theme";

export default function PackingPage() {
  useSystemTheme();
  const p = usePacking();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-2">
            <Link to="/" className="flex-shrink-0">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                <Package className="w-6 h-6 text-white dark:text-black" />
              </div>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold">
                Pack Buddy
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                Tell us how much your vehicle can carry and what you have. We
                pick the goods that help the most and still fit.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div data-tour="importance-card" className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Importance packed
              </span>
              <Star className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-5xl font-bold mb-1">
              {p.plans[p.method].pts}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              out of {p.items.reduce((sum, i) => sum + i.pts, 0)} points in
              total
            </div>
          </div>

          <div data-tour="ways-card" className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Ways to pack
              </span>
              <Layers className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-5xl font-bold mb-1">
              {waysText(p.items.length)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              different choices of what goes in
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ItemsCard
            items={p.items}
            capacityKg={p.capacityKg}
            onCapacityChange={p.setCapacityKg}
            onAdd={p.addItem}
            onRemove={p.removeItem}
            onLoadSample={p.loadSample}
            onClear={p.clearItems}
          />
          <PackResult
            method={p.method}
            onMethodChange={p.setMethod}
            capacityKg={p.capacityKg}
            plans={p.plans}
          />
        </div>

        {/* How It Works Section */}
        <HowItWorks />
      </div>
    </div>
  );
}
