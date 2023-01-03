import { AxiosError } from "axios";

const statusMap: Record<number | string, string> = {
    404: "존재하지 않는 경로입니다.",
    default: "알 수 없는 오류가 발생했습니다."
}

export default function failureHandler(e: unknown) {
    if (e instanceof AxiosError) {
        const status = e.response?.status;
        
        return Error(statusMap[status || "default"]);
    }
}