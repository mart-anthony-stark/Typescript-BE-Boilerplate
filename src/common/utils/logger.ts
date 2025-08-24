import { createLogger, format, transports } from "winston";
import moment from "moment-timezone";

const { combine, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

export const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    format.timestamp({
      format: () =>
        moment()
          .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
          .format("YYYY-MM-DD HH:mm:ss z"),
    }),
    colorize(),
    logFormat
  ),
  transports: [new transports.Console()],
});
