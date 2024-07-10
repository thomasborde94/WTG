interface ProcessEnv {
    REACT_APP_RAWG_API_KEY: string;
  }
  
  interface Process {
    env: ProcessEnv;
  }
  
  declare var process: Process;
  