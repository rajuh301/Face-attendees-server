export function validateRegisterInput(data: any): string | null {
    const { name, email, faceDescriptor } = data;
  
    if (!name || typeof name !== 'string') return 'Invalid name';
    if (!email || typeof email !== 'string') return 'Invalid email';
    if (!faceDescriptor || !Array.isArray(faceDescriptor)) return 'Invalid face descriptor';
    if (!faceDescriptor.every((n: any) => typeof n === 'number')) return 'Face descriptor must be an array of numbers';
  
    return null;
  }
  