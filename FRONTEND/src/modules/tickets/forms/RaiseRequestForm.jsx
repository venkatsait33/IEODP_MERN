import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useCreateTicketMutation } from "../ticketsApi";
import { raiseRequestSchema } from "../validation/ticketSchema";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { fadeUp, fadeIn } from "../../../utils/motionUtils";

const RaiseRequestForm = () => {
  const { user } = useSelector((state) => state.auth);
  const [createTicket] = useCreateTicketMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(raiseRequestSchema),
  });

  const onSubmit = async (data) => {
    await createTicket({
      ...data,
      status: "SUBMITTED",
      raisedBy: user._id,
      createdAt: new Date().toISOString(),
      requestId: crypto.randomUUID(),
    });

    reset();
    toast.success("Request submitted successfully");
    // alert("Request submitted successfully");
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <motion.div variants={fadeUp}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card bg-base-100 md:p-6 max-sm:p-2 shadow"
        >
          <h2 className="text-xl font-bold mb-4">Raise New Request</h2>

          <input
            id="raise-title"
            data-testid="raise-title-input"
            className="input input-bordered md:w-full max-sm:input-sm mb-2"
            placeholder="Title"
            {...register("title")}
          />

          <p className="text-error text-sm">{errors.title?.message}</p>

          <textarea
            id="raise-description"
            data-testid="raise-description-textarea"
            className="textarea textarea-bordered max-sm:input-sm md:w-full mb-2"
            placeholder="Description"
            {...register("description")}
          />
          <p className="text-error text-sm">{errors.description?.message}</p>

          <select
            id="raise-priority"
            data-testid="raise-priority-select"
            className="select select-bordered md:w-full max-sm:select-sm  mb-4"
            {...register("priority")}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <button
            id="raise-submit"
            data-testid="raise-submit-button"
            className="btn btn-primary w-full max-sm:w-48"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default RaiseRequestForm;
