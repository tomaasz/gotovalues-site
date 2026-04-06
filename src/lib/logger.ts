// Structured JSON logger replacing raw console.log calls
export const logger = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (message: string, context?: any) => {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      context,
    }));
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: (message: string, context?: any) => {
    console.info(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      context,
    }));
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn: (message: string, context?: any) => {
    console.warn(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      context,
    }));
  },
};
