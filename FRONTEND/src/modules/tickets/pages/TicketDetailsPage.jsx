import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetTicketByIdQuery } from "../ticketsApi";
import TicketTimeline from "../components/TicketTimeline";
import { ROLES } from "../../../utils/roles";
import { TICKET_STATUS } from "../../../utils/ticketStatus";
import AuditTimeline from "../../audits/components/AuditTimeline";
import { fadeIn, fadeUp } from "../../../utils/motionUtils";
import { motion } from "framer-motion";
import LeaderShipCommentForm from "../forms/LeaderShipCommentForm";
import ManagementActionForm from "../forms/ManagementActionForm";
import AuditorDecisionForm from "../forms/AuditorDecisionForm";

const TicketDetailsPage = () => {
  const { id } = useParams();
  const { role } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetTicketByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  console.log(data);

  if (isLoading)
    return (
      <div className="loading loading-spinner mx-auto flex justify-center" />
    );

  if (!data.ticket) {
    return <div className="alert alert-error">Ticket not found</div>;
  }
  const canLeadershipAct =
    data.ticket.status === TICKET_STATUS.SUBMITTED ||
    data.ticket.status === TICKET_STATUS.REVERIFY;

  const canManagementAct =
    data.ticket.status === TICKET_STATUS.FORWARDED_TO_MANAGEMENT ||
    data.ticket.status === TICKET_STATUS.REVERIFY;

  const canAuditorAct = data.ticket.status === TICKET_STATUS.ACTION_TAKEN;

  return (
    <div className="space-y-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-6"
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          className="card bg-base-200 md:p-4 p-2 shadow"
        >
          <h1 className="text-2xl font-bold mb-1">{data.ticket.title}</h1>
          <p className="text-sm mb-2">{data.ticket.description}</p>

          <div className="flex gap-2">
            <span className="badge badge-outline">{data.ticket.priority}</span>
            <span className="badge badge-info">{data.ticket.status}</span>
          </div>
          <TicketTimeline
            status={data.ticket?.status}
            auditorDecision={data.ticket?.auditorDecision}
          />
        </motion.div>

        {/* Leadership Section */}
        {role === ROLES.LEADERSHIP && canLeadershipAct && (
          <LeaderShipCommentForm ticket={data.ticket} />
        )}

        {/* Management Section */}
        {role === ROLES.MANAGEMENT && canManagementAct && (
          <ManagementActionForm ticket={data.ticket} />
        )}

        {/* Auditor Section */}
        {role === ROLES.AUDITOR && canAuditorAct && (
          <AuditorDecisionForm ticket={data.ticket} />
        )}

        {/* Read-only info blocks */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {data.ticket.leadershipComment && (
            <div className="card bg-base-100 p-4 shadow">
              <h3 className="font-semibold mb-1">Leadership Comment</h3>
              <p className="text-sm">{data.ticket.leadershipComment}</p>
            </div>
          )}

          {data.ticket.managementAction && (
            <motion.div
              variants={fadeUp}
              className="card bg-base-100 p-4 shadow"
            >
              <h3 className="font-semibold mb-1">Management Action</h3>
              <p className="text-sm">{data.ticket.managementAction}</p>
            </motion.div>
          )}

          {data.ticket.auditorDecision && (
            <motion.div
              variants={fadeUp}
              className="card bg-base-100 p-4 shadow"
            >
              <h3 className="font-semibold mb-1">Auditor Decision</h3>
              <p className="text-sm">{data.ticket.auditorDecision}</p>
            </motion.div>
          )}
          <motion.div variants={fadeUp}>
            <AuditTimeline entityId={data.ticket._id} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TicketDetailsPage;
