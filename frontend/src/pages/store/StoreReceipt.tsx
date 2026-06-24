import { useState, useEffect } from "react";
import { Search, ChevronRight, ChevronDown } from "lucide-react";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { getReceipts } from "../../api/receipt";
import type { ReceiptItem } from "../../api/receipt";
import { ReceiptDetailModal } from "./ReceiptDetailModal";

const fmtReceiptNo = (id: number, requestedAt: string) => {
    const year = requestedAt ? new Date(requestedAt).getFullYear() : new Date().getFullYear();
    return `AS-${year}-${String(id).padStart(4, "0")}`;
};

const fmtDate = (s: string | null) => (s ? s.split("T")[0] : "-");

const fmtTime = (s: string | null) => {
    if (!s) return "";
    const d = new Date(s);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const fmtDuration = (start: string | null, end: string | null) => {
    if (!start || !end) return "-";
    const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
    return `${fmtTime(start)} ~ ${fmtTime(end)} · 약 ${mins}분`;
};

const fmtCost = (n: number | null) => (n != null ? `${n.toLocaleString()}원` : "-");

const yearToRange = (y: string) => {
    if (!y) return { startDate: undefined, endDate: undefined };
    return { startDate: `${y}-01-01`, endDate: `${y}-12-31` };
};

const START_YEAR = 2020;
const CURRENT_YEAR = new Date().getFullYear();

const YEARS = Array.from(
    { length: CURRENT_YEAR - START_YEAR + 1 },
    (_, i) => CURRENT_YEAR - i
);

const COLS = "130px 100px 170px 320px 110px 150px 90px 120px 32px";

export function StoreReceipt() {
    const { accessToken } = useAuth();

    const [receipts, setReceipts] = useState<ReceiptItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [year, setYear] = useState("");
    const [search, setSearch] = useState("");
    const [detailId, setDetailId] = useState<number | null>(null);

    useEffect(() => {
        if (!accessToken) return;

        setLoading(true);

        const { startDate, endDate } = yearToRange(year);

        getReceipts(accessToken, { startDate, endDate })
            .then((res) => {
                setReceipts(res.receipts);
                setError("");
            })
            .catch((err) => {
                console.error(err);
                setError("목록을 불러오지 못했습니다.");
            })
            .finally(() => setLoading(false));
    }, [accessToken, year]);

    const filtered = receipts.filter((r) => {
        const k = search.trim().toLowerCase();

        return (
            k === "" ||
            r.equipmentName.toLowerCase().includes(k) ||
            (r.diagnosis ?? "").toLowerCase().includes(k) ||
            fmtReceiptNo(r.id, r.requestedAt).toLowerCase().includes(k)
        );
    });

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 style={{ color: "#0F172A", letterSpacing: "-0.02em" }}>
                    진단서 및 영수증
                </h1>
                <p style={{ color: "#64748B", fontSize: 14, marginTop: 2 }}>
                    진단서 및 영수증 목록을 확인할 수 있습니다.
                </p>
            </div>

            <div className="flex items-center gap-3" style={{ maxWidth: 1400 }}>
                <div className="relative">
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="appearance-none px-4 py-3 pr-10 rounded-lg cursor-pointer"
                        style={{
                            background: "#fff",
                            border: "1px solid rgba(15,23,42,0.12)",
                            fontSize: 14,
                            color: "#0F172A",
                            fontWeight: 500,
                            minWidth: 160,
                        }}
                    >
                        <option value="">전체 기간</option>
                        {YEARS.map((y) => (
                            <option key={y} value={String(y)}>
                                {y}년
                            </option>
                        ))}
                    </select>

                    <ChevronDown
                        size={16}
                        style={{
                            color: "#64748B",
                            position: "absolute",
                            right: 12,
                            top: "50%",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                        }}
                    />
                </div>

                <div
                    className="flex items-center gap-2 px-3 py-3 rounded-lg flex-1"
                    style={{
                        background: "#fff",
                        border: "1px solid rgba(15,23,42,0.08)",
                    }}
                >
                    <Search size={16} style={{ color: "#94A3B8" }} />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="기자재명, 접수번호, 고장 원인 검색..."
                        style={{
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            fontSize: 14,
                            color: "#0F172A",
                            flex: 1,
                        }}
                    />
                </div>
            </div>

            {loading && (
                <p style={{ color: "#94A3B8", fontSize: 14 }}>
                    불러오는 중...
                </p>
            )}

            {error && (
                <p style={{ color: "#DC2626", fontSize: 14 }}>
                    {error}
                </p>
            )}

            {!loading && !error && filtered.length === 0 && (
                <p style={{ color: "#94A3B8", fontSize: 14 }}>
                    조회된 내역이 없습니다.
                </p>
            )}

            {!loading && !error && filtered.length > 0 && (
                <div
                    className="rounded-xl overflow-hidden"
                    style={{
                        background: "#fff",
                        border: "1px solid rgba(15,23,42,0.08)",
                        maxWidth: 1400,
                    }}
                >
                    <div
                        className="grid items-center px-6 py-4"
                        style={{
                            gridTemplateColumns: COLS,
                            gap: 16,
                            background: "#F8FAFC",
                            borderBottom: "1px solid rgba(15,23,42,0.08)",
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#475569",
                        }}
                    >
                        <div>접수번호</div>
                        <div>접수일</div>
                        <div>기자재명</div>
                        <div>고장 원인</div>
                        <div style={{ textAlign: "center" }}>담당 엔지니어</div>
                        <div style={{ textAlign: "center" }}>수리 시간</div>
                        <div style={{ textAlign: "center" }}>상태</div>
                        <div style={{ textAlign: "right" }}>총 금액</div>
                        <div></div>
                    </div>

                    {filtered.map((r) => (
                        <div
                            key={r.id}
                            className="grid items-center px-6 py-4 transition-all hover:bg-slate-50 cursor-pointer"
                            style={{
                                gridTemplateColumns: COLS,
                                gap: 16,
                                borderBottom: "1px solid rgba(15,23,42,0.05)",
                            }}
                            onClick={() => setDetailId(r.id)}
                        >
                            <div
                                style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "#0F172A",
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                {fmtReceiptNo(r.id, r.requestedAt)}
                            </div>

                            <div
                                style={{
                                    fontSize: 14,
                                    color: "#334155",
                                    fontWeight: 500,
                                }}
                            >
                                {fmtDate(r.requestedAt)}
                            </div>

                            <div style={{ minWidth: 0 }}>
                                <div
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 700,
                                        color: "#0F172A",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {r.equipmentName}
                                </div>
                                <div
                                    style={{
                                        fontSize: 13,
                                        color: "#64748B",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {r.modelName}
                                </div>
                            </div>

                            <div
                                style={{
                                    fontSize: 14,
                                    color: "#334155",
                                    fontWeight: 500,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {r.diagnosis ?? "-"}
                            </div>

                            <div
                                style={{
                                    fontSize: 14,
                                    color: "#334155",
                                    fontWeight: 500,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    textAlign: "center",
                                }}
                            >
                                {r.engineerName ?? "-"}
                            </div>

                            <div
                                style={{
                                    fontSize: 14,
                                    color: "#334155",
                                    fontWeight: 500,
                                    whiteSpace: "nowrap",
                                    textAlign: "center",
                                }}
                            >
                                {fmtDuration(r.startTime, r.endTime)}
                            </div>

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <StatusBadge status={mapStatus(r.status)} size="sm" />
                            </div>

                            <div
                                style={{
                                    fontSize: 15,
                                    fontWeight: 700,
                                    color: "#0F172A",
                                    textAlign: "right",
                                }}
                            >
                                {fmtCost(r.totalCost)}
                            </div>

                            <div style={{ textAlign: "right" }}>
                                <ChevronRight size={18} style={{ color: "#CBD5E1" }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 상세 모달 */}
            {detailId != null && (
                <ReceiptDetailModal asRequestId={detailId} onClose={() => setDetailId(null)} />
            )}

        </div>
    );
}

function mapStatus(s: string): "COMPLETED" | "REPAIRING" | "PENDING" {
    if (s === "COMPLETED") return "COMPLETED";
    if (s === "IN_PROGRESS" || s === "ASSIGNED") return "REPAIRING";
    return "PENDING";
}