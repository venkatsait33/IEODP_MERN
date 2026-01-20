import { useSelector } from "react-redux";
import { useGetTicketsQuery } from "../ticketsApi";
import RaiseRequestForm from "../forms/RaiseRequestForm";
import TicketCard from "../components/TicketCard";
import { useState } from "react";
import TicketFilters from "../components/TicketFilters";
import Pagination from "../components/Pagination";
import { motion } from "framer-motion";
import { fadeIn, fadeUp, staggerContainer } from "../../../utils/motionUtils";

const TicketsPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: "",
    priority: "",
    search: "",
  });

  const { role } = useSelector((state) => state.auth);
  const {
    data: tickets = [],
    isLoading,
    isError,
  } = useGetTicketsQuery(filters);

  const hasNext = tickets.length === filters.limit;

  if (isLoading)
    return (
      <div className="loading loading-spinner mx-auto flex justify-center" />
    );
  if (isError)
    return <div className="alert alert-error">Failed to load tickets</div>;

  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        {/* Title */}
        <motion.h2 variants={fadeUp} className="text-2xl font-bold">
          Requests / Ticket Workflows
        </motion.h2>

        {/* OPERATIONS can raise new request */}
        {role === "OPERATOR" && (
          <motion.div variants={fadeUp}>
            <RaiseRequestForm />
          </motion.div>
        )}

        {/* Filters */}
        <motion.div variants={fadeUp} className="mt-3 ">
          <TicketFilters filters={filters} setFilters={setFilters} />
        </motion.div>

        {/* Tickets List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className=""
        >
          {tickets.map((ticket) => (
            <motion.div
              key={ticket._id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              <TicketCard ticket={ticket} />
            </motion.div>
          ))}

          {tickets.length === 0 && (
            <motion.div
              variants={fadeUp}
              className="text-center text-base-content/60 mt-10"
            >
              No tickets found
            </motion.div>
          )}
        </motion.div>

        {/* Pagination */}
        <motion.div variants={fadeUp}>
          <Pagination
            page={filters.page}
            setPage={(page) => setFilters((prev) => ({ ...prev, page }))}
            hasNext={hasNext}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TicketsPage;
