import logger from "../logger";
import handleError from "./error";
import { RequestError } from "../http-errors";

interface FetchOptions extends RequestInit {
    timeout?: number;
}

function isError(error: unknown): error is Error {
    return error instanceof Error;
}

export async function fetchHandler<T>(
    url: string, options: FetchOptions = {}
): Promise<ActionResponse<T>> {
    const { timeout = 100000, headers: customHeader = {}, ...restOptions } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Charset": "utf-8"
    }
    const headers: HeadersInit = { ...defaultHeaders, ...customHeader }
    const config: RequestInit = {
        ...restOptions,
        headers,
        signal: controller.signal
    }
    try {
        const response = await fetch(url, config);
        clearTimeout(id);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new RequestError(response.status, errorData.error?.message || response.statusText || `HTTP error: ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        const error = isError(err) ? err : new Error("Unknown error");
        if (error.name === "AbortError") {
            logger.warn(`Request to ${url} timed out after ${timeout}ms`);
        } else {
            logger.error(`Error fetching ${url}: ${error.message}`);
        }
        return handleError(error) as ActionResponse<T>;
    }
}