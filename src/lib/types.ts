export type UserDoc = {
username: string;
createdAt: any; // Firestore Timestamp
contributionCount: number;
};

export type ReportDoc = {
userId: string;
username: string;
emoji: '🔥' | '😡' | '😈' | '💢';
placeName: string;
note?: string;
lat: number;
lng: number;
geohash?: string;
createdAt: any;
};