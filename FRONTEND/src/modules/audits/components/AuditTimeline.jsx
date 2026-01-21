import { useGetAuditLogsByTicketQuery } from "../auditApi";
import { CheckCircle, Clock, User } from "lucide-react";

const roleBadgeMap = {
  operator: "badge-info",
  leadership: "badge-warning",
  management: "badge-success",
  auditor: "badge-error",
};

const AuditTimeline = ({ ticketId }) => {
  const { data, isLoading } = useGetAuditLogsByTicketQuery(ticketId, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <div className="loading loading-spinner mx-auto flex justify-center" />
    );
  }

  if (!data || !data.timeline?.length) {
    return (
      <div className="card bg-base-200 p-4 shadow">
        <h3 className="font-semibold mb-2">Ticket Timeline</h3>
        <p className="text-sm text-base-content/60">No activity recorded yet</p>
      </div>
    );
  }

  return (
    <div className="card bg-base-200 p-4 shadow">
      <h3 className="font-semibold mb-4">
        Ticket Timeline ({data.totalEvents})
      </h3>

      <div className="relative border-l-2 border-base-300 ml-3 space-y-6">
        {data.timeline.map((log) => (
          <div key={log._id} className="ml-6 relative">
            {/* Timeline Icon */}
            <div className="absolute -left-[31px] top-1.5">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>

            {/* Card */}
            <div className="bg-base-100 p-3 rounded shadow space-y-1">
              {/* User */}
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-semibold text-sm">
                  {log.performedBy?.userName || "System"}
                </span>

                <span
                  className={`badge badge-sm ${
                    roleBadgeMap[log.role] || "badge-neutral"
                  }`}
                >
                  {log.role?.toUpperCase()}
                </span>
              </div>

              {/* Action */}
              <p className="text-sm font-medium">
                {log.actionType.replaceAll("_", " ")}
              </p>

              {/* Status Change */}
              <p className="text-xs text-base-content/70">
                {log.previousStatus && (
                  <>
                    <span className="font-medium">From:</span>{" "}
                    {log.previousStatus}{" "}
                  </>
                )}
                <span className="font-medium">To:</span> {log.newStatus}
              </p>

              {/* Time */}
              <div className="flex items-center gap-1 text-xs text-base-content/60">
                <Clock className="w-3 h-3" />
                {new Date(log.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditTimeline;
