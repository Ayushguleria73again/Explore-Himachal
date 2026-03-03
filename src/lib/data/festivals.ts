export interface Festival {
    id: string;
    name: string;
    month: number; // 0-11 for JS Date months
    district: string;
    districtId: string;
    description: string;
    vibe: "Spiritual" | "Vibrant" | "Cultural" | "Mystical";
    image?: string;
}

export const festivalsData: Festival[] = [
    {
        id: "losar",
        name: "Losar Festival",
        month: 1, // February
        district: "Lahaul and Spiti",
        districtId: "lahaul-spiti",
        description: "The Tibetan New Year, celebrated with masked dances (Cham) and local festivities in monasteries.",
        vibe: "Spiritual"
    },
    {
        id: "mandi-shivratri",
        name: "Mandi Shivratri",
        month: 2, // March
        district: "Mandi",
        districtId: "mandi",
        description: "A week-long international fair where over 200 deities from the region gather to pay homage at the Boothnath Temple.",
        vibe: "Vibrant"
    },
    {
        id: "himachal-day",
        name: "Himachal Day",
        month: 3, // April
        district: "Shimla",
        districtId: "shimla",
        description: "Celebrating the formation of the state with parades, traditional music, and cultural displays.",
        vibe: "Cultural"
    },
    {
        id: "minjar-mela",
        name: "Minjar Mela",
        month: 6, // July
        district: "Chamba",
        districtId: "chamba",
        description: "An ancient harvest festival where locals offer silken tassels (Minjar) to the river Ravi.",
        vibe: "Cultural"
    },
    {
        id: "manali-winter-carnival",
        name: "Winter Carnival",
        month: 0, // January
        district: "Kullu",
        districtId: "kullu",
        description: "A grand display of Himachali culture, folk dances, and winter sports in the heart of Manali.",
        vibe: "Vibrant"
    },
    {
        id: "kullu-dussehra",
        name: "Kullu Dussehra",
        month: 9, // October
        district: "Kullu",
        districtId: "kullu",
        description: "A world-famous festival where Lord Raghunath's chariot is pulled by thousands of devotees in Dhalpur Maidan.",
        vibe: "Vibrant"
    },
    {
        id: "fagli",
        name: "Fagli Festival",
        month: 1, // February
        district: "Kinnaur",
        districtId: "kinnaur",
        description: "A mystical mask festival marking the victory of good over evil at the end of winter.",
        vibe: "Mystical"
    },
    {
        id: "renuka-mela",
        name: "Renuka Ji Fair",
        month: 10, // November
        district: "Sirmaur",
        districtId: "sirmaur",
        description: "Celebrated on the banks of the heil Renuka Lake, marking the reunion of Lord Parshuram and his mother Renuka.",
        vibe: "Spiritual"
    },
    {
        id: "phulaich",
        name: "Phulaich (Festival of Flowers)",
        month: 8, // September
        district: "Kinnaur",
        districtId: "kinnaur",
        description: "A poignant festival dedicated to the village deity and the departed souls, marked by flower-covered gathering.",
        vibe: "Mystical"
    }
];
