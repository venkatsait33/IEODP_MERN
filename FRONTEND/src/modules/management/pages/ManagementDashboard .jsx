import { useGetTicketsQuery } from "../../tickets/ticketsApi";
import { TICKET_STATUS } from "../../../utils/ticketStatus";
import { motion } from "framer-motion";
import { fadeIn, fadeUp } from "../../../utils/motionUtils";
import { BadgeAlert, CircleX, FileChartColumnIncreasing, SquareChevronRight } from "lucide-react";
import BarChartWidget from "../../../components/dashboard/widgets/BarChartWidget";
import PieChartWidget from "../../../components/dashboard/widgets/PieChartWidget";


const ManagementDashboard = () => {
    const { data: tickets = [], isLoading } = useGetTicketsQuery();

    if (isLoading) {
        return <div className="loading loading-spinner loading-lg" />;
    }

    // ---------- Management Relevant Tickets ----------
    const pendingForManagement = tickets.filter(
        (t) => t.status === TICKET_STATUS.FORWARDED_TO_MANAGEMENT
    );

    const actionTaken = tickets.filter(
        (t) => t.status === TICKET_STATUS.ACTION_TAKEN
    );
     const closedCount = tickets.filter(
            (t) => t.status === TICKET_STATUS.CLOSED
        ).length;

    const reverifyCount = tickets.filter(
        (t) => t.status === TICKET_STATUS.REVERIFY
    ).length;

    const rejectedCount = tickets.filter(
        (t) => t.auditorDecision === "REJECTED"
    ).length;

    // ---------- Status Distribution ----------
    const statusData = [
        { name: "Pending Review", value: pendingForManagement.length },
        { name: "Action Taken", value: actionTaken.length },
        { name: "Closed", value: closedCount },
        { name: "Reverify", value: reverifyCount },
        { name: "Rejected", value: rejectedCount },
    ];

    // ---------- Priority Distribution ----------
    const priorityData = [
        { name: "High", value: tickets.filter((t) => t.priority === "HIGH").length },
        {
            name: "Medium",
            value: tickets.filter((t) => t.priority === "MEDIUM").length,
        },
        { name: "Low", value: tickets.filter((t) => t.priority === "LOW").length },
    ];

    return (
        <div className="space-y-6">
            <motion.div initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}>

                <h1 className="text-2xl font-bold mb-4">Management Dashboard</h1>
                <motion.div variants={fadeUp}>
                    <div>
                        <h1 className="text-2xl font-semibold">Welcome back!</h1>
                        <span className="label">
                            Here's your overview for today
                        </span>
                    </div>
                </motion.div>
            </motion.div>


            {/* STATS CARDS */}
            <motion.div initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div variants={fadeUp} className="p-4 rounded-xl shadow-md flex items-center gap-3 bg-base-200 hover:scale-105 transition">
                    <div className="btn btn-accent p-2">
                        <FileChartColumnIncreasing />
                    </div>
                    <div>
                        <div className="text-sm">Pending for Action</div>
                        <div className="text-2xl font-bold">
                            {pendingForManagement.length}
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={fadeUp} className="p-4 rounded-xl shadow-md flex items-center gap-3 bg-base-200 hover:scale-105 transition">
                    <div className="btn btn-info p-2">
                        <SquareChevronRight />
                    </div>
                    <div>
                        <div className="text-sm">Action Taken</div>
                        <div className="text-2xl font-bold">{actionTaken.length}</div>
                    </div>
                </motion.div>

                <motion.div variants={fadeUp} className="p-4 rounded-xl shadow-md flex items-center gap-3 bg-base-200 hover:scale-105 transition">
                    <div className="btn btn-warning p-2">
                        <BadgeAlert />
                    </div>
                    <div>

                        <div className="text-sm">Reverify</div>
                        <div className="text-2xl font-bold">{reverifyCount}</div>
                    </div>
                </motion.div>

                <motion.div variants={fadeUp} className="p-4 rounded-xl shadow-md flex items-center gap-3 bg-base-200 hover:scale-105 transition">
                    <div className="btn btn-error p-2">
                        <CircleX />
                    </div>
                    <div>

                        <div className="text-sm">Rejected</div>
                        <div className="text-2xl font-bold">{rejectedCount}</div>
                    </div>
                </motion.div>
            </motion.div>

            {/* CHART GRID */}
            <motion.section initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* STATUS PIE */}
                <motion.div variants={fadeUp} className="card bg-base-200 p-4 shadow">
                    {/* <h2 className="font-semibold mb-2">Ticket Status Distribution</h2> */}
                    <PieChartWidget title={"Ticket Status Distribution"} data={statusData} />
                    {/* <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer> */}
                </motion.div>

                {/* PRIORITY BAR */}
                <motion.div variants={fadeUp} className="card bg-base-200 p-4 shadow">

                    <BarChartWidget title={"Priority Distribution"} data={priorityData} />
                    {/* <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={priorityData}>
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer> */}
                </motion.div>
            </motion.section>
        </div>
    );
};

export default ManagementDashboard;
