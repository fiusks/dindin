declare namespace NodeJS {
    export interface ProcessEnv {
      PORT: string;
      HOST: string;
      DB_URI?: string;
      DB_HOST:string;
      LALA_USER:string;
      DB_PASSWORD:string;
      DB_DATABASE:string;
    }
  }