export const euclideanDistance = (d1: number[], d2: number[]): number => {
    if (d1.length !== d2.length) return Infinity;
    return Math.sqrt(d1.reduce((sum, val, i) => sum + (val - d2[i]) ** 2, 0));
  };
  