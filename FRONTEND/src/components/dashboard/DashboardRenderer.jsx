import KPIWidget from "./widgets/KPIWidget";
import PieChartWidget from "./widgets/PieChartWidget";
import BarChartWidget from "./widgets/BarChartWidget";
import { TICKET_STATUS } from "../../utils/ticketStatus";

const DashboardRenderer = ({ config, tickets = [], users = [] }) => {
    const computeMetric = (metric, sourceData) => {
        switch (metric) {
            case "active":
                return sourceData.filter(
                    (t) =>
                        t.status === TICKET_STATUS.SUBMITTED ||
                        t.status === TICKET_STATUS.FORWARDED_TO_MANAGEMENT ||
                        t.status === TICKET_STATUS.ACTION_TAKEN
                ).length;

            case "reverify":
                return sourceData.filter(
                    (t) => t.status === TICKET_STATUS.REVERIFY
                ).length;

            case "submitted":
                return sourceData.filter(
                    (t) => t.status === TICKET_STATUS.SUBMITTED
                ).length;

            case "forwarded":
                return sourceData.filter(
                    (t) => t.status === TICKET_STATUS.FORWARDED_TO_MANAGEMENT
                ).length;

            case "managementPending":
                return sourceData.filter(
                    (t) => t.status === TICKET_STATUS.FORWARDED_TO_MANAGEMENT
                ).length;

            case "actionTaken":
                return sourceData.filter(
                    (t) => t.status === TICKET_STATUS.ACTION_TAKEN
                ).length;

            case "auditorPending":
                return sourceData.filter(
                    (t) => t.status === TICKET_STATUS.ACTION_TAKEN
                ).length;

            case "totalUsers":
                return sourceData.length;

            case "activeUsers":
                return sourceData.filter((u) => u.status === "ACTIVE").length;

            default:
                return 0;
        }
    };

    const buildUserTrend = (users, type) => {
        const map = {};

        users.forEach((u) => {
            const date = new Date(u.createdAt).toLocaleDateString();

            if (!map[date]) map[date] = 0;

            if (type === "total") {
                map[date] += 1;
            }

            if (type === "active" && u.status === "ACTIVE") {
                map[date] += 1;
            }
        });

        return Object.entries(map).map(([date, value]) => ({
            date,
            value,
        }));
    };


    // -------------------------
    // GROUPING ENGINE
    // -------------------------
    const groupData = (groupBy, source) => {
        const dataSource = source === "users" ? users : tickets;
        const map = {};

        dataSource.forEach((item) => {
            const key = item[groupBy] || "UNKNOWN";
            map[key] = (map[key] || 0) + 1;
        });

        return Object.entries(map).map(([name, value]) => ({ name, value }));
    };

    // -------------------------
    // RENDER
    // -------------------------
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {config.map((widget) => {
                const sourceData = widget.source === "users" ? users : tickets;

                switch (widget.type) {
                    case "KPI": {
                        let trendData = [];

                        if (widget.metric === "totalUsers") {
                            trendData = buildUserTrend(users, "total");
                        }

                        if (widget.metric === "activeUsers") {
                            trendData = buildUserTrend(users, "active");
                        }

                        return (
                            <KPIWidget
                                key={widget.id}
                                title={widget.title}
                                value={computeMetric(widget.metric, sourceData)}
                                trendData={trendData}
                            />
                        );
                    }


                    case "PIE_CHART":
                        return (
                            <PieChartWidget
                                key={widget.id}
                                title={widget.title}
                                data={groupData(widget.groupBy, widget.source)}
                            />
                        );

                    case "BAR_CHART":
                        return (
                            <BarChartWidget
                                key={widget.id}
                                title={widget.title}
                                data={groupData(widget.groupBy, widget.source)}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default DashboardRenderer;
