
// Spiritual words for ID generation
const SPIRITUAL_WORDS = [
  "DHARMA", "KARMA", "SATTVA", "ATMAN", "BRAHMAN", "CHAKRA", 
  "NIRVANA", "MANTRA", "SHANTI", "DEVA", "PRANA", "MOKSHA",
  "GURU", "SAMSARA", "AHIMSA", "SATYA", "YOGI", "BHAKTI",
  "BUDDHA", "JNANA", "MAYA", "SANGHA", "VEDANTA", "ANANDA"
];

// Symbols for avatar selection
export const SPIRITUAL_SYMBOLS = [
  { id: "om", name: "Om", symbol: "ॐ" },
  { id: "lotus", name: "Lotus", symbol: "🪷" },
  { id: "wheel", name: "Dharma Wheel", symbol: "☸" },
  { id: "eye", name: "Third Eye", symbol: "👁️" },
  { id: "star", name: "Star of David", symbol: "✡️" },
  { id: "crescent", name: "Crescent", symbol: "☪️" },
  { id: "cross", name: "Cross", symbol: "✝️" },
  { id: "yin-yang", name: "Yin Yang", symbol: "☯️" },
  { id: "ankh", name: "Ankh", symbol: "☥" },
  { id: "infinity", name: "Infinity", symbol: "∞" },
  { id: "hamsa", name: "Hamsa", symbol: "🖐️" },
  { id: "flower", name: "Flower of Life", symbol: "❀" }
];

// Get a simple device fingerprint that's anonymized
const getDeviceFingerprint = async (): Promise<string> => {
  // Collect some device data while respecting privacy
  const screenInfo = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const timeZone = new Date().getTimezoneOffset();
  const language = navigator.language;
  const userAgent = navigator.userAgent.slice(0, 30); // Just take a portion
  
  // Create a fingerprint string
  const fingerprintString = `${screenInfo}|${timeZone}|${language}|${userAgent}`;

  // Hash the fingerprint
  const encoder = new TextEncoder();
  const data = encoder.encode(fingerprintString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert to hex string and take just first 8 chars
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex.slice(0, 8);
};

// Generate a checksum for verification
const generateChecksum = (input: string): string => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    sum += input.charCodeAt(i);
  }
  return (sum % 100).toString().padStart(2, '0');
};

// Generate a unique spiritual ID
export const generateSpiritualId = async (): Promise<string> => {
  // Get timestamp to millisecond precision
  const timestamp = Date.now();
  const timestampHash = timestamp.toString(36); // Base36 representation
  
  // Select a random spiritual word
  const spiritualWord = SPIRITUAL_WORDS[Math.floor(Math.random() * SPIRITUAL_WORDS.length)];
  
  // Get device fingerprint
  const deviceHash = await getDeviceFingerprint();
  
  // Create ID without checksum
  const baseId = `${spiritualWord}-${timestampHash}-${deviceHash}`;
  
  // Generate checksum
  const checksum = generateChecksum(baseId);
  
  // Final ID format
  return `OM-${baseId}-${checksum}`;
};

// Verify if a spiritual ID is valid
export const verifyId = (id: string): boolean => {
  try {
    if (!id.startsWith('OM-')) return false;
    
    const parts = id.split('-');
    if (parts.length < 5) return false;
    
    const checksum = parts[parts.length - 1];
    const baseId = parts.slice(1, parts.length - 1).join('-');
    const calculatedChecksum = generateChecksum(baseId);
    
    return checksum === calculatedChecksum;
  } catch (error) {
    return false;
  }
};

// Convert user data to a shareable code
export const generateTransferCode = (userData: any): string => {
  try {
    // Stringify and base64 encode the data
    const jsonData = JSON.stringify(userData);
    const encodedData = btoa(jsonData);
    return encodedData;
  } catch (error) {
    console.error("Failed to generate transfer code", error);
    return "";
  }
};

// Convert a transfer code back to user data
export const decodeTransferCode = (code: string): any => {
  try {
    const jsonData = atob(code);
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Failed to decode transfer code", error);
    return null;
  }
};

export interface UserIdentity {
  id: string;
  name: string;
  symbol: string;
  creationDate: string;
  lifetimeCount?: number;
  preferences?: {
    theme: 'dark' | 'light';
  };
}
