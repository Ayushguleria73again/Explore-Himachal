# Explore Himachal — Land of the Gods 🏔️

A premium digital archive and interactive travel guide dedicated to documenting the vibrant heritage, diverse landscapes, and ancient traditions of the 12 districts of Himachal Pradesh, India.

---

## 🌟 Key Features

- **🗺️ Interactive District Map**: A custom SVG-based map of Himachal Pradesh. Hover to view district stats and real-time weather, or click to dive into the deep archive of that region.
- **🛠️ Himalayan Travel Toolkit (`/planner`)**: A centralized suite of interactive travel planning applications:
  - **🧭 AI Itinerary Route Maker**: Design customized travel paths based on duration and vibe, featuring high-contrast print-to-PDF formatting.
  - **🎒 Smart Packing Assistant**: Cross-reference climate zones by month and district to generate list items. Features dynamic completion bars and native print stylesheets to save checklists as clean, borderless PDFs.
  - **🧗 Altitude & Oxygen Risk Calculator**: Interactive safety dial that estimates oxygen percentages relative to sea level and evaluates Acute Mountain Sickness (AMS) risk based on ascent rates and rest days.
  - **🗣️ Pahari Dialect Soundboard**: Practice regional dialects (Kangri, Mandyali, Kinnauri, Lahauli) with realistic voice audio, variable learning speeds, server-side caching (5ms load times), and local browser speech synthesizers.
  - **🎉 Festival & Fair Finder**: Search regional spiritual, vibrant, or mystical cultural gatherings throughout the year.
  - **🤖 Mela Ram AI Assistant**: Chat console built in loving memory of retired Indian Army Subedar and Honorary Captain Mela Ram (from Beh Bagroli, Kangra). He proudly answers questions about geography, weather, food, and culture.
- **🎭 Cultural Essence & Culinary Spotlights**: Deep views of traditional arts (e.g., Kangra Miniatures, Thangka Scroll paintings), local cuisines (e.g., Siddu, Sepu Badi, Dham), and heritage timelines.
- **📸 Shared Echoes (Community Gallery)**: A tabbed gallery that merges curated media spotlights with a live simulated social media feed under the `#ExploreHimachal` hashtag.
- **🌿 Nature & Wildlife Registry**: Displays the native flora and protected wildlife species found across the sub-tropical valleys and high cold deserts of the Himalayas.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Logic**: React 18
- **Styling**: TailwindCSS & PostCSS
- **Animations**: Framer Motion (for premium parallax scroll effects and interactive animations)
- **Icons**: Lucide React
- **Voice synthesis**: ElevenLabs API with server-side local buffer cache
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
Create a `.env.local` file in the root of the project to enable the AI assistants and voice soundboard:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_VOICE_ID=your_elevenlabs_voice_id_here
```
*(Note: If no ElevenLabs API key is provided, the dialect soundboard automatically falls back to native browser speech synthesis using localized Indian voices so it works out of the box).*

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
│   │   ├── api/              # API routes (Gemini chat, itineraries, ElevenLabs speech)
│   │   ├── districts/        # Dynamic district detail views
│   │   ├── planner/          # Centralized travel planner page
│   │   └── page.tsx          # Homepage
│   ├── components/
│   │   ├── layout/           # Navbar & Footer (with printing exclusions)
│   │   ├── ui/               # Base UI elements
│   │   └── features/         # Stateful feature modules
│   │       ├── home/         # InteractiveMap, ItineraryPlanner, etc.
│   │       ├── explore/      # PackingAssistant
│   │       ├── planner/      # AdventureCalculator, DialectGlossary, FestivalFinder
│   │       └── chat/         # Mela Ram AI ChatWidget & ChatConsole
│   └── lib/
│       ├── data/             # JSON data maps, district files, and SVGs
│       └── utils.ts          # Styling/tailwind merges
├── public/                   # Static media and assets
├── tailwind.config.js        # Custom Tailwind configurations
├── next.config.mjs           # Next.js settings
└── LICENSE                   # MIT License
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
