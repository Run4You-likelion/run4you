import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080/api' });

function authHeader(token: string) {
    return { Authorization: `Bearer ${token}` };
}

export type Priority = 'EMERGENCY' | 'NORMAL';
export type AsStatus = 'RECEIVED' | 'MATCHING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

// A/S 접수 입력 (AsRequestCreateDto)
export interface AsRequestCreateRequest {
    equipmentId: number;
    priority: Priority;
    errorCode?: string;
    symptom: string;
}

// A/S 접수 완료 응답 (AsRequestResponseDto)
export interface AsRequestResponse {
    id: number;
    priority: Priority;
    status: AsStatus;
    requestedAt: string;
    equipmentId: number;
    equipmentName: string;
    errorCode: string | null;
    symptom: string | null;
}

// A/S 접수 생성 (POST /api/as-requests)
export async function createAsRequest(
    token: string,
    data: AsRequestCreateRequest
): Promise<AsRequestResponse> {
    const res = await api.post('/as-requests', data, { headers: authHeader(token) });
    return res.data.data;
}

// 고장 기자재의 진행 중인 A/S 접수 상세 조회 (GET /api/as-requests/by-equipment/{equipmentId})
export async function getActiveAsRequestByEquipment(
    token: string,
    equipmentId: number
): Promise<AsRequestResponse> {
    const res = await api.get(`/as-requests/by-equipment/${equipmentId}`, { headers: authHeader(token) });
    return res.data.data;
}