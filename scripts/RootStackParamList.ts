// NavigationTypes.ts
// RootStackParamList.ts or similar file
export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
    SavedAirlines: { savedAirlines: Airline[] }; // Define the correct type for the params
  };
  
  
  export type Airline = {
    image: string;
    name: string;
    icao: string;
    iata: string | null;
    country: string;
    country_iso: string;
    callsign: string;
    available: boolean;
  };
  