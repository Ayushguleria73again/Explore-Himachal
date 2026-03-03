import kangra from "./districts/kangra.json";
import kullu from "./districts/kullu.json";
import shimla from "./districts/shimla.json";
import chamba from "./districts/chamba.json";
import mandi from "./districts/mandi.json";
import lahaulSpiti from "./districts/lahaul-spiti.json";
import kinnaur from "./districts/kinnaur.json";
import sirmaur from "./districts/sirmaur.json";
import solan from "./districts/solan.json";
import una from "./districts/una.json";
import bilaspur from "./districts/bilaspur.json";
import hamirpur from "./districts/hamirpur.json";

export interface ItineraryDay {
    day: number;
    title: string;
    activities: string[];
    description: string;
}

export interface Itinerary {
    title: string;
    duration: string;
    description: string;
    days: ItineraryDay[];
}

export interface TopSpot {
    name: string;
    description: string;
    x: number; // Percentage for Meta-Map
    y: number; // Percentage for Meta-Map
}

export interface District {
    id: string;
    name: string;
    headquarters: string;
    image: string;
    shortFact: string;
    description: string;
    history: string;
    culture: string;
    stats: {
        area?: string;
        population?: string;
        altitude?: string;
        bestTime?: string;
    };
    latitude: number;
    longitude: number;
    topSpots: TopSpot[];
    cuisine?: {
        name: string;
        description: string;
        history: string;
        image: string;
        tip: string;
    };
    wildlife?: {
        name: string;
        scientificName: string;
        status: string;
        description: string;
        image: string;
    };
    flora?: {
        name: string;
        scientificName: string;
        description: string;
        image: string;
    };
    weather?: {
        temp_summer: string;
        temp_winter: string;
        monsoon_impact: string;
        packing_essentials: string;
    };
    activities?: string[];
    connectivity?: {
        nearest_airport: string;
        nearest_railway: string;
        distance_from_chandigarh: string;
        distance_from_delhi: string;
    };
    festivals?: {
        name: string;
        month: string;
        description?: string;
    }[];
    itineraries?: Itinerary[];
    gallery?: string[];
    interests?: ("Adventure" | "Peace" | "Heritage")[];
    vibe?: ("Snowy" | "Tropical" | "High Altitude")[];
}

export const districtsData: District[] = [
    kangra as District,
    kullu as District,
    shimla as District,
    chamba as District,
    mandi as District,
    lahaulSpiti as District,
    kinnaur as District,
    sirmaur as District,
    solan as District,
    una as District,
    bilaspur as District,
    hamirpur as District
];
