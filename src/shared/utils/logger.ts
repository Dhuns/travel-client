/**
 * Logger utility for consistent logging across the application
 * - Development: Full logging with details
 * - Production: Only errors (silent by default, can be enabled)
 */

const isDevelopment = process.env.NODE_ENV === 'development';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerOptions {
	enableInProduction?: boolean;
}

const defaultOptions: LoggerOptions = {
	enableInProduction: false,
};

function shouldLog(level: LogLevel, options: LoggerOptions = defaultOptions): boolean {
	if (isDevelopment) return true;
	if (options.enableInProduction) return true;
	// In production, only log errors by default
	return level === 'error';
}

function formatMessage(prefix: string, message: string): string {
	const timestamp = new Date().toISOString();
	return `[${timestamp}] ${prefix}: ${message}`;
}

export const logger = {
	debug(message: string, ...args: unknown[]): void {
		if (shouldLog('debug')) {
			console.debug(formatMessage('DEBUG', message), ...args);
		}
	},

	info(message: string, ...args: unknown[]): void {
		if (shouldLog('info')) {
			console.info(formatMessage('INFO', message), ...args);
		}
	},

	warn(message: string, ...args: unknown[]): void {
		if (shouldLog('warn')) {
			console.warn(formatMessage('WARN', message), ...args);
		}
	},

	error(message: string, error?: unknown, ...args: unknown[]): void {
		if (shouldLog('error')) {
			console.error(formatMessage('ERROR', message), error, ...args);
			// TODO: In production, send to error reporting service (e.g., Sentry)
			// if (!isDevelopment && error) {
			//   reportToSentry(error);
			// }
		}
	},
};

export default logger;
