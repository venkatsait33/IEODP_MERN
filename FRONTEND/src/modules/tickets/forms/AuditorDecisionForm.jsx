import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auditorDecisionSchema } from "../validation/ticketSchema";
import { toast } from "react-toastify";
import { useAddTicketActionMutation } from "../ticketsApi";

const AuditorDecisionForm = ({ ticket }) => {
  const [addTicketAction, { isLoading }] = useAddTicketActionMutation({
    refetchOnMountOrArgChange: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(auditorDecisionSchema),
  });

  const onSubmit = async (data) => {
    try {
      const actionMap = {
        APPROVED: "AUDITOR_APPROVED",
        REJECTED: "AUDITOR_REJECTED",
        REVERIFY: "AUDITOR_REVERIFY",
      };

      await addTicketAction({
        id: ticket._id,
        actionType: actionMap[data.auditorDecision],
        comment: data.comment || "",
      }).unwrap();

      if (data.auditorDecision === "REVERIFY") {
        toast.warning("Reverification requested. Ticket sent back.");
      } else if (data.auditorDecision === "REJECTED") {
        toast.error("Ticket rejected by auditor.");
      } else {
        toast.success("Ticket approved and closed.");
      }

      reset();
    } catch (error) {
      console.error("Auditor decision failed:", error);
      toast.error("Failed to submit decision.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card bg-base-100 p-4 shadow space-y-3"
    >
      <h3 className="font-bold text-lg">Auditor Decision</h3>

      <select
        id="auditor-decision"
        data-testid="auditor-decision-select"
        className="select select-bordered w-full"
        {...register("auditorDecision")}
      >
        <option value="">Select decision</option>
        <option value="APPROVED">Approved</option>
        <option value="REVERIFY">Reverify</option>
        <option value="REJECTED">Reject</option>
      </select>

      {errors.auditorDecision && (
        <p className="text-error text-sm">{errors.auditorDecision.message}</p>
      )}

      <button
        id="auditor-finalize"
        data-testid="auditor-finalize-button"
        className="btn btn-error btn-sm w-fit"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="loading loading-spinner loading-md" />
        ) : (
          "Finalize Decision"
        )}
      </button>
    </form>
  );
};

export default AuditorDecisionForm;
