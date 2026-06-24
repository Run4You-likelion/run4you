import { useState, useEffect, useRef } from "react";
import { X, Shield, FileText, CheckCircle, Download, Printer } from "lucide-react";
import html2pdf from "html2pdf.js";
import { useAuth } from "../../context/AuthContext";
import { getReceiptDetail } from "../../api/receipt";
import type { ReceiptDetail } from "../../api/receipt";

const fmtTime = (s: string | null) => {
    if (!s) return "";
    const d = new Date(s);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};
const fmtDuration = (start: string | null, end: string | null) => {
    if (!start || !end) return "-";
    const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
    return `${fmtTime(start)} ~ ${fmtTime(end)} (약 ${mins}분)`;
};
const fmtCost = (n: number | null) => (n != null ? `${n.toLocaleString()}원` : "-");
const fmtDate = (s: string | null) => (s ? s.split("T")[0] : "-");

interface Props {
    asRequestId: number;
    onClose: () => void;
}

export function ReceiptDetailModal({ asRequestId, onClose }: Props) {
    const { accessToken } = useAuth();
    const [data, setData] = useState<ReceiptDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!accessToken) return;
        setLoading(true);
        getReceiptDetail(accessToken, asRequestId)
            .then((res) => { setData(res); setError(""); })
            .catch((err) => { console.error(err); setError("상세 내역을 불러오지 못했습니다."); })
            .finally(() => setLoading(false));
    }, [accessToken, asRequestId]);

    // PDF 저장 (영수증 내용을 PDF로 변환)
    const handlePdf = () => {
        if (!contentRef.current) return;
        const opt = {
            margin: 10,
            filename: `영수증_${data?.invoiceNumber ?? asRequestId}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };
        html2pdf().set(opt).from(contentRef.current).save();
    };

    return (
        <div
            className="fixed inset-0 [z-60] flex items-center justify-center p-4"
            style={{ background: "rgba(15,23,42,0.4)" }}
            onClick={onClose}
        >
            <div
                className="rounded-2xl w-full max-w-3xl flex flex-col"
                style={{ background: "#fff", boxShadow: "0 20px 50px rgba(0,0,0,0.25)", maxHeight: "88vh" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* 헤더 */}
                <div className="flex items-start justify-between px-8 pt-7 pb-5" style={{ borderBottom: "1px solid rgba(15,23,42,0.08)" }}>
                    <div>
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>진단서 및 영수증 상세</h2>
                        {data && (
                            <p style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>
                                {data.invoiceNumber ? `영수증 번호: ${data.invoiceNumber}` : `접수번호: AS-${asRequestId}`}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center gap-2">
                            <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-2 rounded-lg" style={{ background: "#F1F5F9", color: "#475569", fontSize: 13, fontWeight: 600 }}>
                                <Printer size={14} /> 인쇄
                            </button>
                            {!loading && !error && data && (
                                <button onClick={handlePdf} className="flex items-center gap-1.5 px-3 py-2 rounded-lg" style={{ background: "#2563EB", color: "#fff", fontSize: 13, fontWeight: 600 }}>
                                    <Download size={14} /> PDF 저장
                                </button>
                            )}
                        </div>
                        <button onClick={onClose} className="ml-4">
                            <X size={22} style={{ color: "#94A3B8" }} />
                        </button>
                    </div>
                </div>

                {loading && <p className="px-8 py-8" style={{ color: "#94A3B8" }}>불러오는 중...</p>}
                {error && <p className="px-8 py-8" style={{ color: "#DC2626" }}>{error}</p>}

                {!loading && !error && data && (
                    <div ref={contentRef} className="px-8 py-6 overflow-y-auto flex-1 flex flex-col gap-5">
                        {/* 진단서 카드 */}
                        <div className="rounded-xl p-5" style={{ background: "#fff", border: "1px solid rgba(15,23,42,0.08)" }}>
                            <div className="flex items-center gap-2 mb-4">
                                <Shield size={16} style={{ color: "#2563EB" }} />
                                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>기기 건강 진단서</h3>
                                <span className="ml-auto px-2.5 py-0.5 rounded-full" style={{ background: "#F0FDF4", color: "#16A34A", fontSize: 12, fontWeight: 600 }}>
                                    {data.status === "COMPLETED" ? "수리 완료" : "진행 중"}
                                </span>
                            </div>

                            {/* 정보 2x2 (고장원인 제외) */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <InfoBox label="기자재명" value={`${data.equipmentName} (${data.modelName})`} />
                                <InfoBox label="담당 엔지니어" value={data.engineerName ? `${data.engineerName}${data.engineerRating ? ` (평점 ${data.engineerRating} ★)` : ""}` : "-"} />
                                <InfoBox label="수리 시간" value={fmtDuration(data.startTime, data.endTime)} />
                                <InfoBox label="완료일" value={fmtDate(data.endTime)} />
                            </div>

                            {/* 정비 의견 */}
                            <div className="p-4 rounded-xl" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
                                <div className="flex items-start gap-2">
                                    <CheckCircle size={15} style={{ color: "#16A34A", marginTop: 1 }} />
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: "#166534" }}>정비 의견</div>
                                        <div style={{ fontSize: 14, color: "#15803D", marginTop: 4, lineHeight: 1.6 }}>
                                            {data.diagnosis ?? "정비 의견이 없습니다."}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 교체 부품 + 금액 */}
                        <div className="rounded-xl overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(15,23,42,0.08)" }}>
                            <div className="flex items-center gap-2 p-4" style={{ borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
                                <FileText size={15} style={{ color: "#64748B" }} />
                                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>교체 부품 목록</h3>
                            </div>
                            <table className="w-full">
                                <thead>
                                <tr style={{ background: "#F8FAFC" }}>
                                    {["부품 코드", "부품명", "수량", "단가", "금액"].map((h, i) => (
                                        <th key={h} style={{ fontSize: 12, color: "#64748B", fontWeight: 600, padding: "10px 16px", textAlign: i >= 2 ? "right" : "left", borderBottom: "1px solid rgba(15,23,42,0.06)" }}>{h}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {data.parts.length === 0 ? (
                                    <tr><td colSpan={5} style={{ padding: "16px", fontSize: 13, color: "#94A3B8", textAlign: "center" }}>교체 부품이 없습니다.</td></tr>
                                ) : (
                                    data.parts.map((p) => (
                                        <tr key={p.partCode} style={{ borderBottom: "1px solid rgba(15,23,42,0.04)" }}>
                                            <td style={{ padding: "12px 16px", fontSize: 13, fontFamily: "var(--font-mono)", color: "#475569", fontWeight: 500 }}>{p.partCode}</td>
                                            <td style={{ padding: "12px 16px", fontSize: 14, color: "#1E293B", fontWeight: 500 }}>{p.partName}</td>
                                            <td style={{ padding: "12px 16px", fontSize: 14, color: "#334155", textAlign: "right" }}>{p.quantity}개</td>
                                            <td style={{ padding: "12px 16px", fontSize: 14, color: "#334155", textAlign: "right" }}>{fmtCost(p.unitPrice)}</td>
                                            <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 600, color: "#0F172A", textAlign: "right" }}>{fmtCost(p.amount)}</td>
                                        </tr>
                                    ))
                                )}
                                {/* 금액 요약 */}
                                <tr style={{ background: "#F8FAFC" }}>
                                    <td colSpan={3} />
                                    <td style={{ padding: "11px 16px", fontSize: 14, color: "#475569", textAlign: "right" }}>공임비</td>
                                    <td style={{ padding: "11px 16px", fontSize: 14, fontWeight: 600, color: "#1E293B", textAlign: "right" }}>{fmtCost(data.laborCost)}</td>
                                </tr>
                                <tr style={{ background: "#F8FAFC" }}>
                                    <td colSpan={3} />
                                    <td style={{ padding: "11px 16px", fontSize: 14, color: "#475569", textAlign: "right" }}>부품비</td>
                                    <td style={{ padding: "11px 16px", fontSize: 14, fontWeight: 600, color: "#1E293B", textAlign: "right" }}>{fmtCost(data.partsCost)}</td>
                                </tr>
                                {data.commissionAmount != null && data.commissionAmount > 0 && (
                                    <tr style={{ background: "#FEF9C3" }}>
                                        <td colSpan={3} />
                                        <td style={{ padding: "11px 16px", fontSize: 14, color: "#92400E", textAlign: "right" }}>긴급 수수료</td>
                                        <td style={{ padding: "11px 16px", fontSize: 14, fontWeight: 700, color: "#D97706", textAlign: "right" }}>{fmtCost(data.commissionAmount)}</td>
                                    </tr>
                                )}
                                <tr style={{ background: "#F8FAFC" }}>
                                    <td colSpan={3} />
                                    <td style={{ padding: "11px 16px", fontSize: 14, color: "#475569", textAlign: "right" }}>부가세 (10%)</td>
                                    <td style={{ padding: "11px 16px", fontSize: 14, fontWeight: 600, color: "#1E293B", textAlign: "right" }}>{fmtCost(data.vatAmount)}</td>
                                </tr>
                                <tr style={{ background: "#EFF6FF", borderTop: "2px solid #BFDBFE" }}>
                                    <td colSpan={3} />
                                    <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 700, color: "#1E40AF", textAlign: "right" }}>최종 합계</td>
                                    <td style={{ padding: "14px 16px", fontSize: 16, fontWeight: 800, color: "#2563EB", textAlign: "right" }}>{fmtCost((data.billedAmount ?? 0) + (data.vatAmount ?? 0))}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function InfoBox({ label, value }: { label: string; value: string }) {
    return (
        <div className="p-3 rounded-lg" style={{ background: "#F8FAFC" }}>
            <div style={{ fontSize: 13, color: "#94A3B8" }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#334155", marginTop: 3 }}>{value}</div>
        </div>
    );
}