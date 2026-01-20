import { motion } from "framer-motion";
import { fadeUp, fadeIn } from "../../../utils/motionUtils";
const TicketFilters = ({ filters, setFilters }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      {/* SEARCH */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col md:flex-row gap-3 mb-4"
      >
        <input
          type="text"
          placeholder="Search tickets..."
          className="input input-bordered md:w-64"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }))
          }
        />

        {/* STATUS */}
        <select
          className="select select-bordered md:w-48"
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value, page: 1 }))
          }
        >
          <option value="">All Status</option>
          <option value="SUBMITTED">Submitted</option>
          <option value="FORWARDED_TO_MANAGEMENT">Leadership Review</option>
          <option value="ACTION_TAKEN">Management Action</option>
          <option value="REVERIFY">Reverify</option>
          <option value="CLOSED">Closed</option>
        </select>

        {/* PRIORITY */}
        <select
          className="select select-bordered md:w-48"
          value={filters.priority}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priority: e.target.value,
              page: 1,
            }))
          }
        >
          <option value="">All Priority</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </motion.div>
    </motion.div>
  );
};

export default TicketFilters;
