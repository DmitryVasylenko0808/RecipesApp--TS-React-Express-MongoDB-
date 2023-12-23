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

    countRate = calculateCountRate(rating);
    rate = calculateRating(rating, countRate);

    return { countRate, rate };
}