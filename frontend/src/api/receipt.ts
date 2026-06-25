import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080/api' });

function authHeader(token: string) {
    return { Authorization: `Bearer ${token}` };
}

// 목록 (ReceiptListResponseDto)
export interface ReceiptItem {
    id: number;
    requestedAt: string;
    status: 'RECEIVED' | 'MATCHING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    equipmentName: string;
    modelName: string;
    diagnosis: string | null;
    engineerName: string | null;
    startTime: string | null;
    endTime: string | null;
    totalCost: number | null;
}

export interface ReceiptListResponse {
    receipts: ReceiptItem[];
}

// 상세 (ReceiptDetailResponseDto)
export interface PartItem {
    partCode: string;
    partName: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}

export interface ReceiptDetail {
    asRequestId: number;
    invoiceNumber: string | null;
    pdfUrl: string | null;
    status: 'RECEIVED' | 'MATCHING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    equipmentName: string;
    modelName: string;
    engineerName: string | null;
    engineerRating: number | null;
    startTime: string | null;
    endTime: string | null;
    diagnosis: string | null;
    parts: PartItem[];
    laborCost: number | null;
    partsCost: number | null;
    commissionAmount: number | null;
    vatAmount: number | null;
    billedAmount: number | null;
}

// 검색 파라미터
export interface ReceiptSearchParams {
    startDate?: string;
    endDate?: string;
    category?: string;
}

// 진단서/영수증 목록
export async function getReceipts(
    token: string,
    params?: ReceiptSearchParams
): Promise<ReceiptListResponse> {
    const res = await api.get('/as-requests/receipts', { headers: authHeader(token), params });
    return res.data.data;
}

// 진단서/영수증 상세
export async function getReceiptDetail(
    token: string,
    asRequestId: number
): Promise<ReceiptDetail> {
    const res = await api.get(`/as-requests/receipts/${asRequestId}`, { headers: authHeader(token) });
    return res.data.data;
}