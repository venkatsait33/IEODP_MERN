import {
    LineChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
} from "recharts";

const KPIWidget = ({ title, value, trendData = [] }) => {
    return (
        <div className="card bg-base-200 p-4 shadow hover:shadow-md transition">
            <div className="text-sm text-base-content/70">{title}</div>

            <div className="text-2xl font-bold mt-1">{value}</div>

            {/* Sparkline */}
            {/* {trendData.length > 0 && (
                <div className="mt-3 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Tooltip
                                contentStyle={{ fontSize: "12px" }}
                                cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )} */}

            {
                trendData.length > 0 && (
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#10b981"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )
            }
        </div>
    );
};

export default KPIWidget;
