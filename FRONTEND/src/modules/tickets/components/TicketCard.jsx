// import { useSelector } from "react-redux";
import TicketTimeline from "./TicketTimeline";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const TicketCard = ({ ticket }) => {
  //   const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div
      id={`ticket-${ticket._id}`}
      data-testid={`ticket-card-${ticket._id}`}
      onClick={() => navigate(`/tickets/${ticket._id}`)}
      className="card bg-base-200 md:p-4 max-sm:p-2 mb-4 gap-2 flex flex-col shadow cursor-pointer hover:shadow-lg transition"
    >
      <h4 className="font-bold text-lg mb-1">{ticket.title}</h4>
      <p className="text-sm mb-2">{ticket.description}</p>
      <TicketTimeline
        status={ticket?.status}
        auditorDecision={ticket?.auditorDecision}
      />
      <div className="flex gap-2 mb-2">
        <span className="badge badge-outline ">{ticket.priority}</span>
        <span className="badge badge-info ">{ticket.status}</span>
      </div>

      {/* {role === ROLES.LEADERSHIP && ticket.status === TICKET_STATUS.SUBMITTED && (
                <LeadershipCommentForm ticket={ticket} />
            )}

            {role === ROLES.MANAGEMENT &&
                ticket.status === TICKET_STATUS.FORWARDED_TO_MANAGEMENT && (
                    <ManagementActionForm ticket={ticket} />
                )}

            {role === ROLES.AUDITORS &&
                ticket.status === TICKET_STATUS.ACTION_TAKEN && (
                    <AuditorDecisionForm ticket={ticket} />
                )} */}
    </div>
  );
};

export default memo(TicketCard);
