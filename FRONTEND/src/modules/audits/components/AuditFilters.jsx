import { fadeUp } from "../../../utils/motionUtils";
import { motion } from "framer-motion";
const AuditFilters = ({ search, setSearch }) => {
  return (
    <motion.div variants={fadeUp}>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by user, action, entity..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </motion.div>
  );
};

export default AuditFilters;
