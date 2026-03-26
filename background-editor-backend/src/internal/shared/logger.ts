import { format } from "date-fns-tz";
import pino from "pino";

const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      options: {
        translateTime: false,
        colorize: true,
      },
    },
  ],
});

const pinoConfig = pino(
  {
    base: null,
    level: process.env.LOG_LEVEL || "info",
    serializers: {
      stack: (stack: string | undefined) => {
        try {
          return stack
            ? stack
                .replace(/Error|\n/g, "")
                .trim()
                .split("  at ")
            : undefined;
        } catch (err) {
          return "[Failed to parse stack trace]";
        }
      },
    },
    formatters: {
      level(label) {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: () => {
      try {
        return `,"time":"${format(new Date(), "dd.MM.yyyy | HH:mm:ss", { timeZone: "Asia/Tomsk" })}"`;
      } catch {
        return `,"time":"${new Date().toISOString()}"`;
      }
    },
  },
  transport,
);

export const logger = pinoConfig;
