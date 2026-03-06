// Vite automatically loads .env.development (npm run dev) or .env.production (npm run build)
const API = import.meta.env.VITE_API_URL;

export default API;
