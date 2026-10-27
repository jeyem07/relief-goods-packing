# Pack Buddy

A web application that helps optimize relief goods packing for disaster response. This app uses the knapsack algorithm to determine the best combination of items to pack based on weight capacity and importance ratings.

## About This App

When responding to disasters, relief workers need to maximize the impact of supplies they can deliver within vehicle weight limits. This application:

- Helps you prioritize which relief items to pack based on their importance
- Ensures you don't exceed your vehicle's weight capacity
- Compares two packing strategies: Quick Pack (fast greedy algorithm) vs Best Pack (optimal dynamic programming solution)
- Shows you exactly what to pack and what to leave behind

### Features

- **Dynamic Item Management**: Add items with weight and importance ratings (1-10)
- **Capacity Planning**: Set your vehicle's weight capacity in kilograms
- **Two Packing Algorithms**:
  - **Quick Pack**: Fast greedy approach that prioritizes items by importance-to-weight ratio
  - **Best Pack**: Optimal solution using dynamic programming (0/1 knapsack)
- **Visual Statistics**: See total importance packed and number of possible combinations
- **Pagination**: Handle long item lists with paginated table view
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Automatic theme switching based on system preferences

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** for fast development and building
- **Tailwind CSS 4** for styling
- **Bun** as package manager
- **Lucide React** for icons

## Setup Instructions

### Prerequisites

You'll need either **Bun** or **npm** (Node.js) installed on your system.

#### Option 1: Using Bun (Recommended - Faster)

Install Bun if you don't have it:

```bash
# On Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1|iex"

# On macOS/Linux
curl -fsSL https://bun.sh/install | bash
```

#### Option 2: Using npm

Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed. npm comes with Node.js.

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd relief-packing
```

2. Install dependencies:

**Using Bun:**
```bash
bun install
```

**Using npm:**
```bash
npm install
```

3. Start the development server:

**Using Bun:**
```bash
bun run dev
```

**Using npm:**
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

**Using Bun:**
```bash
bun run build
bun run preview  # Preview the production build
```

**Using npm:**
```bash
npm run build
npm run preview  # Preview the production build
```

## Usage

1. **Set Capacity**: Enter your vehicle's weight capacity in kilograms
2. **Add Items**: Add relief items with their name, weight (kg), and importance rating (1-10)
   - Use "Use sample goods" to load example items
3. **Choose Algorithm**: Toggle between "Quick pack" and "Best pack" to compare strategies
4. **Review Results**: See what items to pack, weight utilization, and which items are left behind
5. **Navigate Items**: Use pagination controls if you have more than 5 items

## Project Structure

```
src/
├── app/                    # Main app component
├── components/             # Reusable UI components
│   └── ui/                # Base UI components (buttons, cards, tables, etc.)
├── features/
│   └── packing/           # Packing feature module
│       ├── components/    # Feature-specific components
│       ├── hooks/         # Custom React hooks
│       ├── types/         # TypeScript types
│       └── utils/         # Utility functions & algorithms
├── hooks/                 # Global hooks
└── lib/                   # Shared utilities

```

## Algorithms

### Quick Pack (Greedy Algorithm)
- Calculates importance-to-weight ratio for each item
- Sorts items by this ratio in descending order
- Adds items until capacity is reached
- Time complexity: O(n log n)

### Best Pack (Dynamic Programming - 0/1 Knapsack)
- Uses dynamic programming to find optimal combination
- Guarantees maximum total importance within weight limit
- Time complexity: O(n × W) where W is capacity
- Space complexity: O(n × W)

## Contributing

This is a class project. If you're a classmate and want to contribute or report issues, please reach out!

## License

This project is for educational purposes.
