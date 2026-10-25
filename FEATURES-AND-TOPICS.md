# Relief Goods Packing: Features Mapped to Computational Complexity Topics

**Course:** Module VIII - Computational Complexity  
**Problem:** 0/1 Knapsack Problem

This document maps each system feature to the specific computational complexity topics it demonstrates.

---

## 📊 Topic Coverage Overview

| Topic | Feature(s) | User-Visible? |
|-------|-----------|---------------|
| Time Complexity | Best Pack, Quick Pack, Ways to Pack counter | ✅ Yes |
| Space Complexity | Best Pack algorithm | ⚠️ Mentioned in code |
| Complexity Classes | All packing features | ✅ Yes |
| P (Polynomial) | Quick Pack, Weight verification | ✅ Yes |
| NP (Non-deterministic Polynomial) | Weight check verification | ✅ Yes |
| Polynomial Reduction | Subset Sum reduction | ❌ Documentation only |
| NP-Hard | Optimization problem (maximize value) | ✅ Yes |
| NP-Complete | Decision problem (value ≥ K?) | ⚠️ Implicit |
| Approximation Algorithms | Quick Pack vs Best Pack comparison | ✅ Yes |

---

## 🎯 Feature-by-Feature Breakdown

### Feature 1: Capacity Field
**Location:** Truck/box capacity input (default 50 kg)

**Connected Topics:**
- **Time Complexity** - Dynamic programming table size depends on capacity
- **Space Complexity** - Memory usage is O(n × W) where W is capacity in 0.1kg units

**Explanation:**
- Capacity of 50kg = 500 units (in 0.1kg steps)
- Best Pack builds a table with 500 columns (one per weight unit)
- Running time: O(n × W) ≈ 12 items × 500 = 6,000 operations
- This is **pseudo-polynomial**: polynomial in the *value* of W, but exponential in the *length* of W (log W digits)

**Code Reference:**
```
src/features/packing/utils/best-pack.ts
src/features/packing/utils/units.ts
src/features/packing/components/capacity-field.tsx
```

---

### Feature 2: Add Item Form
**Location:** Form with Item name, Weight, and Importance fields

**Connected Topics:**
- **Time Complexity** - Each item doubles the search space (2ⁿ)
- **Complexity Classes** - Shows why brute force is infeasible

**Explanation:**
- Each item = one yes/no decision
- n items = 2ⁿ possible combinations
- 12 items = 4,096 combinations
- 20 items = 1,048,576 combinations
- 30 items = 1,073,741,824 combinations (over 1 billion!)
- Demonstrates **exponential growth** - the fundamental hardness of the problem

**Code Reference:**
```
src/features/packing/components/item-form.tsx
src/features/packing/hooks/use-packing.ts (addItem function)
```

---

### Feature 3: Item Table with Remove Button
**Location:** Table listing all added items with Remove buttons

**Connected Topics:**
- **Time Complexity** - Removing items halves the search space
- **Complexity Classes** - Shows the problem instance (the input)

**Explanation:**
- The table IS the input to the knapsack problem
- Each row: one item with weight and value (importance)
- Removing an item: 2ⁿ becomes 2ⁿ⁻¹
- The table makes the problem instance concrete and visible

**Code Reference:**
```
src/features/packing/components/item-table.tsx
src/features/packing/hooks/use-packing.ts (removeItem function)
```

---

### Feature 4: "Ways to Pack" Card
**Location:** Top stat card showing "4,096 different choices of what goes in"

**Connected Topics:**
- **Time Complexity** - Visualizes exponential growth (2ⁿ)
- **Complexity Classes** - Shows brute force search space size

**Explanation:**
- Displays 2ⁿ where n = number of items
- Updates in real-time as items are added/removed
- Makes exponential growth tangible without technical jargon
- 1 item → 2 ways
- 2 items → 4 ways
- 3 items → 8 ways
- 12 items → 4,096 ways
- Shows why brute force (trying all combinations) is impossible

**Code Reference:**
```
src/app/routes/packing-page.tsx (Ways to pack stat card)
src/features/packing/utils/format.ts (waysText function)
```

---

### Feature 5: "Importance Packed" Card
**Location:** Top stat card showing points packed vs total points

**Connected Topics:**
- **Complexity Classes** - Shows the optimization objective
- **NP-Hard** - This is the value being maximized

**Explanation:**
- Shows total importance/value of selected items
- The goal: **maximize** this number
- Subject to: weight ≤ capacity
- This "find the maximum" version is **NP-Hard**
- Decision version: "Can we get ≥ K importance?" is **NP-Complete**

**Code Reference:**
```
src/app/routes/packing-page.tsx (Importance packed stat card)
src/features/packing/hooks/use-packing.ts (plans object)
```

---

### Feature 6: Best Pack Algorithm
**Location:** "Best pack" tab in the What to Pack card

**Connected Topics:**
- **Time Complexity** - O(n × W) pseudo-polynomial time
- **Space Complexity** - O(n × W) memory for DP table
- **Complexity Classes** - Beats brute force for reasonable W

**Algorithm:** Dynamic Programming
- **Time:** O(n × W) = O(items × capacity_in_units)
- **Space:** O(n × W) for the DP table
- **Result:** Always finds the optimal solution

**Explanation:**
- Builds a table: rows = items, columns = weight units (0 to capacity)
- Each cell [i, w] = "best value using first i items with weight limit w"
- Reuses solutions to subproblems (DP principle)
- **Pseudo-polynomial:** Fast when W is small (like 500 units), but exponential in the bit-length of W
- With 12 items and 500 units: ~6,000 operations vs 4,096 (brute force) - but scales much better!

**Why it's not truly polynomial:**
- Input size = n + log(W) bits
- Running time is exponential in log(W)
- This is what makes it "pseudo-polynomial"

**Code Reference:**
```
src/features/packing/utils/best-pack.ts
```

**Key Algorithm Logic:**
```typescript
// For each item and each possible weight:
for (let i = 1; i <= n; i++) {
  for (let w = 0; w <= W; w++) {
    if (item[i].weight <= w) {
      // Can fit: choose max of (include item) vs (exclude item)
      dp[i][w] = Math.max(
        dp[i-1][w],                           // don't take item
        dp[i-1][w - item[i].weight] + item[i].value  // take item
      )
    } else {
      dp[i][w] = dp[i-1][w]  // can't fit, skip item
    }
  }
}
```

---

### Feature 7: Quick Pack Algorithm
**Location:** "Quick pack" tab in the What to Pack card

**Connected Topics:**
- **Time Complexity** - O(n log n) polynomial time
- **P (Polynomial)** - Runs in polynomial time
- **Approximation Algorithms** - Fast heuristic, no optimality guarantee

**Algorithm:** Greedy (by importance-to-weight ratio)
- **Time:** O(n log n) for sorting
- **Space:** O(n) for sorted array
- **Result:** Usually close to optimal, no guarantee

**Explanation:**
1. Calculate ratio: importance / weight for each item
2. Sort items by ratio (descending) - O(n log n)
3. Greedily add items until truck is full - O(n)
4. Total: O(n log n) - truly polynomial!

**This is an Approximation Algorithm:**
- Pro: Very fast - polynomial time
- Pro: Often gets close to optimal (90%+ in practice)
- Con: No worst-case guarantee in this simple form
- Con: Can be arbitrarily bad in pathological cases

**Example where Quick Pack is suboptimal:**
- Capacity: 10 kg
- Items:
  - A: 10 kg, importance 10 (ratio = 1.0)
  - B: 6 kg, importance 7 (ratio ≈ 1.17)
  - C: 5 kg, importance 6 (ratio = 1.2)
- Quick Pack chooses C (ratio 1.2) then B (ratio 1.17) = 11kg total = doesn't fit → just takes C = 6 points
- Best Pack chooses A = 10 points (optimal)

**Code Reference:**
```
src/features/packing/utils/quick-pack.ts
```

**Key Algorithm Logic:**
```typescript
// Sort by importance-to-weight ratio (descending)
items.sort((a, b) => (b.pts / b.kg) - (a.pts / a.kg))

// Greedily add items until capacity reached
let currentWeight = 0
for (const item of items) {
  if (currentWeight + item.kg <= capacity) {
    packed.push(item)
    currentWeight += item.kg
  }
}
```

---

### Feature 8: Best Pack vs Quick Pack Comparison
**Location:** Alert in "What to pack" card showing point difference

**Connected Topics:**
- **Approximation Algorithms** - Measures approximation quality
- **Time Complexity** - Shows the speed-quality tradeoff

**Explanation:**
- Compares results of both algorithms
- Example: "Best pack carries 3 more importance points than Quick pack (51 vs 48)"
- Approximation ratio: 48/51 ≈ 94% (Quick Pack achieves 94% of optimal)
- Shows the **fundamental tradeoff**: Speed (polynomial) vs Optimality (pseudo-polynomial/harder)

**In sample data (12 items, 50kg capacity):**
- Best Pack: 51 points (optimal)
- Quick Pack: 48 points (94% of optimal)
- Best Pack takes longer but guarantees optimal
- Quick Pack is instant and "good enough" for most cases

**Code Reference:**
```
src/features/packing/components/pack-result.tsx (comparison alert)
```

---

### Feature 9: Weight Check Verification
**Location:** Green "Weight check passed" alert

**Connected Topics:**
- **NP (Non-deterministic Polynomial)** - Problems where solutions are easy to verify
- **Complexity Classes** - Verification vs solving

**Explanation:**
- **Given** a proposed solution (list of items to pack)
- **Verify** it's valid in polynomial time: O(n)
  1. Sum up weights: O(n)
  2. Check if sum ≤ capacity: O(1)
  3. Sum up importance values: O(n)
  4. Total: O(n) - polynomial!

**This is the definition of NP:**
- **Finding** the best solution is hard (no known polynomial algorithm)
- **Checking** a proposed solution is easy (polynomial time)
- If someone hands you a solution, you can quickly verify if it's valid
- This is why knapsack is in NP

**The key insight:**
- "Is this solution valid?" → Easy (polynomial)
- "Find the best solution" → Hard (no known polynomial algorithm)
- This asymmetry is the essence of NP

**Code Reference:**
```
src/features/packing/components/pack-result.tsx (weight check alert)
src/features/packing/utils/totals.ts
```

**Verification Logic:**
```typescript
// O(n) verification
const totalWeight = packed.reduce((sum, item) => sum + item.kg, 0)
const totalValue = packed.reduce((sum, item) => sum + item.pts, 0)
const isValid = totalWeight <= capacity  // O(1) comparison
```

---

### Feature 10: Load Summary Lists
**Location:** "In the box" and "Left behind" lists in What to Pack card

**Connected Topics:**
- **Complexity Classes** - Shows the solution to the optimization problem
- **NP-Hard** - The result of solving the hard problem

**Explanation:**
- **In the box:** Items selected by the algorithm (the solution)
- **Left behind:** Items that didn't fit
- Together, they form a **partition** of all items
- Finding this optimal partition is the **NP-Hard** optimization problem

**Decision vs Optimization versions:**
- **Decision (NP-Complete):** "Is there a load worth ≥ K points that fits?"
- **Optimization (NP-Hard):** "What is the maximum value load that fits?"
- Our app solves the optimization version (harder)

**Code Reference:**
```
src/features/packing/components/pack-result.tsx (In the box / Left behind sections)
```

---

### Feature 11: Sample Goods Button
**Location:** "Use sample goods" button

**Connected Topics:**
- **Time Complexity** - Provides a known test case (12 items = 2¹² = 4,096 combinations)
- **Approximation Algorithms** - Shows known gap (51 vs 48 points)

**Explanation:**
- Loads 12 realistic relief items
- 2¹² = 4,096 possible combinations
- Small enough to understand, large enough to be interesting
- Known answer: Best Pack = 51 points, Quick Pack = 48 points
- 3-point gap demonstrates approximation quality

**Sample Data:**
```
Rice (25 kg, 9 pts), Water (15 kg, 10 pts), Medicine (2 kg, 10 pts),
Blankets (8 kg, 7 pts), Clothes (10 kg, 6 pts), Canned food (12 kg, 8 pts),
First aid (3 kg, 9 pts), Flashlights (1 kg, 5 pts), Batteries (2 kg, 5 pts),
Tents (20 kg, 8 pts), Tools (7 kg, 4 pts), Hygiene kit (4 kg, 6 pts)
```

**Code Reference:**
```
src/features/packing/utils/sample-items.ts
```

---

### Feature 12: Clear List Button
**Location:** "Clear list" button

**Connected Topics:**
- **Time Complexity** - Resets search space to 2⁰ = 1 (empty set)

**Explanation:**
- Removes all items
- Ways to pack: 2ⁿ → 2⁰ = 1
- Allows starting fresh for new scenarios

**Code Reference:**
```
src/features/packing/hooks/use-packing.ts (clearItems function)
```

---

### Feature 13: Pagination
**Location:** Page numbers and arrows at bottom of item table

**Connected Topics:**
- **Space Complexity** - UI optimization (not algorithm complexity)

**Explanation:**
- Limits visible items to 5 per page
- Prevents UI bloat with many items
- Does NOT affect algorithm complexity
- Pure UI/UX feature

**Code Reference:**
```
src/features/packing/components/items-card.tsx
```

---

## 🔗 Polynomial Reduction (Not visible in UI)

### Subset Sum → 0/1 Knapsack

**Connected Topics:**
- **Polynomial Reduction** - Shows knapsack is at least as hard as Subset Sum
- **NP-Complete** - Proves knapsack decision version is NP-Complete

**The Reduction:**

**Subset Sum Problem (known to be NP-Complete):**
- Given: Numbers s₁, s₂, ..., sₙ and target T
- Question: Is there a subset that sums to exactly T?

**Transform to Knapsack:**
1. Create one item for each number sᵢ:
   - Weight = sᵢ
   - Importance = sᵢ
2. Set capacity = T
3. Ask: "Is there a load with importance ≥ T that fits?"

**Why this works:**
- Since weight = importance for all items, the only way to get importance ≥ T is to have importance = T (can't exceed because of weight limit)
- Importance = T means weight = T (because weight = importance)
- Weight = T means we found a subset that sums to T!

**Conclusion:**
- Transformation takes O(n) time (polynomial)
- If we could solve knapsack quickly, we could solve Subset Sum quickly
- Subset Sum is NP-Complete
- Therefore, knapsack is **at least as hard** → NP-Hard
- Since verification is easy (Feature 9), the decision version is in NP
- Therefore, knapsack decision version is **NP-Complete**

**This is NOT implemented in the app** - include in documentation/presentation.

---

## 📚 Summary Table: Features → Topics

| Feature | Time | Space | P | NP | NP-Hard | NP-Complete | Approx. |
|---------|------|-------|---|----|---------| ------------|---------|
| Capacity field | O(n×W) | O(n×W) | - | - | ✓ | - | - |
| Add item | 2ⁿ | - | - | - | - | - | - |
| Item table | - | - | - | - | - | - | - |
| Ways to pack | 2ⁿ | - | - | - | - | - | - |
| Importance card | - | - | - | - | ✓ | - | - |
| Best Pack | O(n×W) | O(n×W) | - | - | - | - | - |
| Quick Pack | O(n log n) | O(n) | ✓ | - | - | - | ✓ |
| Comparison | - | - | - | - | - | - | ✓ |
| Weight check | O(n) | - | ✓ | ✓ | - | - | - |
| Load summary | - | - | - | - | ✓ | ✓ | - |
| Sample goods | - | - | - | - | - | - | - |

---

## 🎤 Presentation Tips

### Demo Flow:
1. **Start** → Show landing page explaining the topics
2. **Load sample** → "4,096 ways to pack" (exponential growth)
3. **Add 3 items** → Watch counter grow: 4,096 → 8,192 → 16,384 → 32,768
4. **Compare algorithms** → "Best Pack vs Quick Pack" (approximation)
5. **Show verification** → "Weight check passed" (NP class)
6. **Change capacity** → Explain pseudo-polynomial (capacity affects table size)
7. **Discuss reduction** → Subset Sum → Knapsack (NP-Complete proof)

### Key Talking Points:
- **Exponential growth:** Each item doubles combinations (2ⁿ)
- **Pseudo-polynomial:** Fast for small capacities, but not truly polynomial
- **Approximation:** Quick Pack is fast (polynomial) but approximate
- **NP:** Easy to verify, hard to find
- **NP-Complete:** Decision version is as hard as any NP problem
- **NP-Hard:** Optimization version is even harder

---

## 📖 References

**Code Files by Topic:**

**Time Complexity:**
- `src/features/packing/utils/best-pack.ts` (O(n×W))
- `src/features/packing/utils/quick-pack.ts` (O(n log n))
- `src/features/packing/utils/format.ts` (2ⁿ calculation)

**Space Complexity:**
- `src/features/packing/utils/best-pack.ts` (DP table)

**P Class:**
- `src/features/packing/utils/quick-pack.ts`
- `src/features/packing/components/pack-result.tsx` (verification)

**NP Class:**
- `src/features/packing/components/pack-result.tsx` (weight check)

**Approximation:**
- `src/features/packing/utils/quick-pack.ts`
- `src/features/packing/components/pack-result.tsx` (comparison)

**All UI:**
- `src/app/routes/packing-page.tsx` (main app)
- `src/features/packing/components/` (all components)

---

## 🎓 Educational Notes

### Why this problem matters:
- **Real-world applications:** Shipping, resource allocation, budgeting, cargo loading
- **Theoretical importance:** Fundamental NP-Complete problem
- **Teaching tool:** Shows P vs NP, approximation algorithms, dynamic programming

### What students learn:
1. **Exponential growth** is impossible to brute force
2. **Dynamic programming** can beat brute force for some problems
3. **Approximation algorithms** trade optimality for speed
4. **NP-Complete** problems are verified easily but solved hard
5. **Polynomial reduction** proves hardness by transformation

### Common misconceptions addressed:
- ❌ "Best Pack proves knapsack is in P" → No, it's pseudo-polynomial
- ❌ "Quick Pack always gives 90%+" → No worst-case guarantee
- ❌ "NP means exponential" → No, NP is about verification
- ❌ "NP-Complete is harder than NP-Hard" → No, reversed

---

**Document Version:** 1.0  
**Last Updated:** [Current Date]  
**Course:** Module VIII - Computational Complexity  
**Problem:** 0/1 Knapsack Problem
