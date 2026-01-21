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
import TicketCommentBlock from "../components/TicketCommentBlock";

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
    role === ROLES.LEADERSHIP &&
    [TICKET_STATUS.SUBMITTED, TICKET_STATUS.REVERIFY].includes(
      data.ticket.status,
    );

  const canManagementAct =
    role === ROLES.MANAGEMENT &&
    [TICKET_STATUS.FORWARDED_TO_MANAGEMENT, TICKET_STATUS.REVERIFY].includes(
      data.ticket.status,
    );

  const canAuditorAct =
    role === ROLES.AUDITOR && data.ticket.status === TICKET_STATUS.ACTION_TAKEN;

  const getLatestCommentByRole = (timeline, role) => {
    return [...timeline].reverse().find((t) => t.role === role && t.comment);
  };

  const leadershipComment = getLatestCommentByRole(data.timeline, "leadership");
  const managementComment = getLatestCommentByRole(data.timeline, "management");

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

        {data.ticket.status === TICKET_STATUS.CLOSED && (
          <div className="alert alert-success">
            This ticket has been closed. No further actions allowed.
          </div>
        )}

        {data.ticket.status === TICKET_STATUS.REVERIFY && (
          <div className="alert alert-warning">
            Reverification requested. Please update the ticket.
          </div>
        )}

        {/* Leadership Section */}
        {/* Leadership */}
        {canLeadershipAct && <LeaderShipCommentForm ticket={data.ticket} />}

        {/* Management */}
        {canManagementAct && <ManagementActionForm ticket={data.ticket} />}

        {/* Auditor */}
        {canAuditorAct && <AuditorDecisionForm ticket={data.ticket} />}

        {/* Read-only info blocks */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {leadershipComment && (
            <TicketCommentBlock
              title="Leadership Comment"
              comment={leadershipComment.comment || ""}
              author={leadershipComment.performedBy.userName}
              date={leadershipComment.createdAt}
            />
          )}

          {managementComment && (
            <TicketCommentBlock
              title="Management Action"
              comment={managementComment.comment}
              author={managementComment.performedBy.userName}
              date={managementComment.createdAt}
            />
          )}

          {data.ticket.auditorDecision && (
            <motion.div variants={fadeUp} className="card  p-4 gap-1 shadow">
              <h3 className="font-semibold ">Auditor Decision</h3>
              <p className="text-sm">{data.ticket.auditorDecision}</p>
              <p className="text-sm whitespace-pre-wrap">
                {new Date(data.ticket.updatedAt).toLocaleString()}
              </p>
            </motion.div>
          )}

          <motion.div variants={fadeUp}>
            <AuditTimeline ticketId={data.ticket._id} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TicketDetailsPage;
