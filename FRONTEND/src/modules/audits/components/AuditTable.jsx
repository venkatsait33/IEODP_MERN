// const AuditTable = ({ logs }) => {
//     return (
//         <div className="overflow-x-auto bg-base-100 shadow rounded">
//             <table className="table table-zebra w-full">
//                 <thead>
//                     <tr>
//                         <th>User</th>
//                         <th>Role</th>
//                         <th>Action</th>
//                         <th>Entity</th>
//                         <th>Timestamp</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {logs.map((log) => (
//                         <tr key={log.id}>
//                             <td>{log.user}</td>
//                             <td>
//                                 <span className="badge badge-outline">{log.role}</span>
//                             </td>
//                             <td>{log.action}</td>
//                             <td>{log.entity}</td>
//                             <td>{new Date(log.timestamp).toLocaleString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AuditTable;

import { Link } from "react-router-dom";
import { fadeIn, fadeUp } from "../../../utils/motionUtils";
import { motion } from "framer-motion";

const AuditTable = ({ logs }) => {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <motion.div
        variants={fadeUp}
        className="overflow-x-auto bg-base-100 shadow rounded"
      >
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Ticket Title</th>
              <th>User</th>
              <th>Action</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td>
                  <Link to={`/tickets/${log._id}`} className="link">
                    {log?.title}
                  </Link>
                </td>
                <td>{log?.raisedBy?.userName}</td>
                <td>{log?.raisedBy?.role}</td>
                <td>{log?.auditorDecision}</td>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default AuditTable;
