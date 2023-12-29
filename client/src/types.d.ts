export type Option = { 
    name: string, 
    value: string, 
    selected: boolean 
};

export type RatingData = {
    "1": string[];
    "2": string[];
    "3": string[];
    "4": string[];
    "5": string[];
};

export type RateAnalytics = {
    name: string,
    count: number,
    percentage: number
};