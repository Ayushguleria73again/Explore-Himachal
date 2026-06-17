# Explore Himachal — Land of the Gods 🏔️

A premium digital archive and interactive travel guide dedicated to documenting the vibrant heritage, diverse landscapes, and ancient traditions of the 12 districts of Himachal Pradesh, India.

---

## 🌟 Key Features

- **🗺️ Interactive District Map**: A custom SVG-based map of Himachal Pradesh. Hover to view district stats and real-time weather, or click to dive into the deep archive of that region.
- **🤖 AI-Powered Itinerary Planner**: Utilizes **Google Gemini 2.5 Flash** to craft personalized itineraries based on your duration (3, 5, or 7 days) and preferred vibe (Adventure, Peace, or Culture), with a robust local fallback engine.
- **🎭 Cultural Essence & Culinary Spotlights**: Deep dives into traditional arts (e.g., Kangra Miniatures, Thangka Scroll paintings), local cuisines (e.g., Siddu, Sepu Badi, Dham), and heritage timelines.
- **📸 Shared Echoes (Community Gallery)**: A tabbed gallery that merges curated media spotlights with a live simulated social media feed under the `#ExploreHimachal` hashtag.
- **🌿 Nature & Wildlife Registry**: Displays the native flora and protected wildlife species found across the sub-tropical valleys and high cold deserts of the Himalayas.
- **🚗 Connectivity & Weather Guides**: Clear directions, transport hubs, distances from major cities (Delhi, Chandigarh), packing guidelines, and seasonal travel advisories for each district.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Logic**: React 18
- **Styling**: TailwindCSS & PostCSS
- **Animations**: Framer Motion (for premium parallax scroll effects and interactive animations)
- **Icons**: Lucide React
- **AI Engine**: Google Generative AI SDK (`gemini-2.5-flash`)

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have Node.js installed on your machine (v18.x or higher recommended).

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/Ayushguleria73again/Explore-Himachal.git
cd Explore-Himachal
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root of the project to enable the AI Itinerary Planner:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Running the Dev Server
Run the local Next.js dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to experience the site.

---

## 📁 Project Structure

```text
Explore-Himachal/
├── src/
│   ├── app/                  # Next.js App Router (pages & API endpoints)
│   │   ├── api/              # API routes (Gemini planner & social feeds)
│   │   ├── districts/        # Dynamic district detail views
│   │   └── page.tsx          # Homepage
│   ├── components/
│   │   ├── layout/           # Navbar & Footer
│   │   └── ui/               # Reusable UI components & interactive widgets
│   └── lib/
│       ├── data/             # JSON data maps, district files, and SVGs
│       └── utils.ts          # Styling/tailwind merges
├── public/                   # Static media and assets
├── tailwind.config.js        # Custom Tailwind configurations
└── next.config.mjs           # Next.js settings
```
