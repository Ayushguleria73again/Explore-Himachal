import { NextResponse } from "next/server";

const MOCK_SOCIAL_POSTS = [
    {
        id: "hash_1",
        src: "/images/community_spiti_stars_1772429679558.png",
        author: "@starlight_nomad",
        likes: 420,
        caption: "Midnight magic in Spiti. The stars here are something else. #ExploreHimachal #Starlit",
        timestamp: "2h ago"
    },
    {
        id: "hash_2",
        src: "/images/community_shimla_cafe_1772429694890.png",
        author: "@coffee_and_clouds",
        likes: 125,
        caption: "Morning views from the Ridge. Best siddu in town! #ShimlaDiaries #HimalayanArchive",
        timestamp: "4h ago"
    },
    {
        id: "hash_3",
        src: "/images/community_manali_trek_1772429714302.png",
        author: "@tread_lightly",
        likes: 890,
        caption: "Lost in the green. Beas river is roaring today. #ManaliTrek #AdventureHimachal",
        timestamp: "6h ago"
    },
    {
        id: "hash_4",
        src: "/images/culture_masked_cham.jpg",
        author: "@heritage_hunter",
        likes: 310,
        caption: "The colors of the Cham dance. Pure energy at Key Monastery. #SpitiCulture #SacredArt",
        timestamp: "8h ago"
    },
    {
        id: "hash_5",
        src: "/images/culture_siddu.png",
        author: "@foodie_mountains",
        likes: 560,
        caption: "Authentic Siddu served hot. The soul of Himachali cuisine. #HimachalFood #ArchiveCuisine",
        timestamp: "10h ago"
    }
];

export async function GET() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json(MOCK_SOCIAL_POSTS);
}
