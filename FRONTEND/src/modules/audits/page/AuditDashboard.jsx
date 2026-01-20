import { useGetTicketsQuery } from "../../tickets/ticketsApi";
import { TICKET_STATUS } from "../../../utils/ticketStatus";
import { fadeIn, fadeUp } from "../../../utils/motionUtils";
import { motion } from "framer-motion";
import {
  BadgeAlert,
  CircleCheckBig,
  CircleX,
  FileChartColumnIncreasing,
} from "lucide-react";
import PieChartWidget from "../../../components/dashboard/widgets/PieChartWidget";
import BarChartWidget from "../../../components/dashboard/widgets/BarChartWidget";

const AuditorDashboard = () => {
  const { data: tickets = [], isLoading } = useGetTicketsQuery();

  if (isLoading) {
    return (
      <div className="loading loading-spinner mx-auto flex justify-center" />
    );
  }

  // ---------- Auditor Relevant Tickets ----------
  const pendingDecisions = tickets.filter(
    (t) => t.status === TICKET_STATUS.ACTION_TAKEN,
  );

  const approvedCount = tickets.filter(
    (t) => t.auditorDecision === "ACCEPTED",
  ).length;

  const rejectedCount = tickets.filter(
    (t) => t.auditorDecision === "REJECTED",
  ).length;

  const reverifyCount = tickets.filter(
    (t) => t.auditorDecision === "REVERIFY",
  ).length;

  // ---------- Decision Distribution ----------
  const decisionData = [
    { name: "Approved", value: approvedCount },
    { name: "Rejected", value: rejectedCount },
    { name: "Reverify", value: reverifyCount },
    { name: "Pending", value: pendingDecisions.length },
  ];

  // ---------- Priority Distribution ----------
  const priorityData = [
    {
      name: "High",
      value: tickets.filter((t) => t.priority === "HIGH").length,
    },
    {
      name: "Medium",
      value: tickets.filter((t) => t.priority === "MEDIUM").length,
    },
    { name: "Low", value: tickets.filter((t) => t.priority === "LOW").length },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h1 className="text-2xl font-bold mb-4">Auditor Dashboard</h1>
        <motion.div variants={fadeUp}>
          <div>
            <h1 className="text-2xl font-semibold">Welcome back!</h1>
            <span className="label">Here's your overview for today</span>
          </div>
        </motion.div>
      </motion.div>

      {/* STATS CARDS */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div
          variants={fadeUp}
          className="p-4 rounded-xl shadow-md flex items-center gap-3 bg-base-200 hover:scale-105 transition"
        >
          <div className="btn btn-accent p-2">
            <FileChartColumnIncreasing />
          </div>
          <div>
            <div className="text-sm">Pending Decisions</div>
            <div className="text-2xl font-bold">{pendingDecisions.length}</div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="p-4 rounded-xl shadow-md flex items-center gap-3 bg-base-200 hover:scale-105 transition"
        >
          <div className="btn btn-success p-2">
            <CircleCheckBig />
          </div>
          <div className="text-sm">Approved</div>
          <div className="text-2xl font-bold">{approvedCount}</div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="p-4 rounded-xl shadow-md flex items-center gap-3 bg-base-200 hover:scale-105 transition"
        >
          <div className="btn btn-error p-2">
            <CircleX />
          </div>
          <div className="text-sm">Rejected</div>
          <div className="text-2xl font-bold">{rejectedCount}</div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="p-4 rounded-xl shadow-md flex items-center gap-3 bg-base-200 hover:scale-105 transition"
        >
          <div className="btn btn-warning p-2">
            <BadgeAlert />
          </div>
          <div className="text-sm">Reverify</div>
          <div className="text-2xl font-bold">{reverifyCount}</div>
        </motion.div>
      </motion.div>

      {/* CHART GRID */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* DECISION PIE */}
        <motion.div variants={fadeUp} className="card bg-base-200 p-4 shadow">
          <PieChartWidget title={"Decision Distribution"} data={decisionData} />
          {/* <h2 className="font-semibold mb-2"></h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={decisionData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label
                            >
                                {decisionData.map((entry, index) => (
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
          {/* <h2 className="font-semibold mb-2">Priority Distribution</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={priorityData}>
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuditorDashboard;
