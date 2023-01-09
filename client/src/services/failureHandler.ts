import { AxiosError } from "axios";

export default function failureHandler(e: unknown) {
    if (e instanceof AxiosError) {
        const status = e.response?.status;
        const message = e.response?.data.details;

        return Error(`[${status}] ${message}`);
    }
}