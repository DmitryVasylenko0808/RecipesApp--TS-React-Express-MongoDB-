import { RateAnalytics } from "../types";

type Rating = {
    "1": string[];
    "2": string[];
    "3": string[];
    "4": string[];
    "5": string[];
};

export const useRate = (rating: Rating) => {
    let countRate = 0;
    let rate = 0;
    let analytics: RateAnalytics[];

    const calculateCountRate = (rating: Rating) => {
        let count = 0;
    
        for (let value of Object.values(rating)) {
          count += value.length;
        }
    
        return count;
      };
    
      const calculateRating = (rating: Rating, countRate: number) => {
        if (countRate === 0) return 0;
    
        let rate = 0;
    
        for (let [k, v] of Object.entries(rating)) {
          rate += rating[k as keyof Rating].length * parseFloat(k);
        }
    
        rate /= countRate;
    
        return rate;
      };

    const anazyleRate = (rating: Rating, countRate: number): RateAnalytics[] => {
      const result = Object.entries(rating)
        .reverse()
        .map(([k, v]) => ({
          name: k,
          count: v.length,
          percentage: v.length / countRate * 100
      }));

      return result;
    }

    countRate = calculateCountRate(rating);
    rate = calculateRating(rating, countRate);
    analytics = anazyleRate(rating, countRate);

    return { countRate, rate, analytics };
}