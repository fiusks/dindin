declare namespace NodeJS {
    export interface ProcessEnv {
      PORT: string;
      HOST: string;
      DB_URI?: string;
    }
  }