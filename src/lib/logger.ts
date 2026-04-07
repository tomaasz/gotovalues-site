// Structured JSON logger replacing raw console.log calls
function formatLog(level: string, message: string, context?: unknown) {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
  });
}

export const logger = {
  error: (message: string, context?: unknown) => {
    console.error(formatLog('error', message, context));
  },
  info: (message: string, context?: unknown) => {
    console.info(formatLog('info', message, context));
  },
  warn: (message: string, context?: unknown) => {
    console.warn(formatLog('warn', message, context));
  },
};
