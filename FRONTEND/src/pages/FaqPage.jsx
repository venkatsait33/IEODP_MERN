import { fadeIn, fadeUp } from "../utils/motionUtils";
import { motion } from "framer-motion";

const FaqPage = () => {
  const faqs = [
    {
      question: "What is IEODP?",
      answer:
        "IEODP (Intelligent Enterprise operator & Decision Platform) is a unified enterprise platform to manage workflows, governance, compliance, and AI-assisted decision making across roles.",
    },
    {
      question: "Which roles are supported in the platform?",
      answer:
        "The platform supports operator, Leadership, Management, Auditors, and Admin roles. Each role has permission-driven access and actions.",
    },
    {
      question: "How does the ticket workflow work?",
      answer:
        "Tickets are raised by operator, reviewed by Leadership, acted upon by Management, and finally approved/rejected/reverified by Auditors. Each step is tracked with a full audit timeline.",
    },
    {
      question: "What happens if an auditor marks a ticket as Reverify?",
      answer:
        "When marked as Reverify, the ticket reopens and allows all relevant roles to add additional information without losing previous history.",
    },
    {
      question: "Is all activity logged?",
      answer:
        "Yes. Every action is recorded in an append-only audit log to ensure compliance, traceability, and governance.",
    },
    {
      question: "Is the platform secure?",
      answer:
        "Yes. The platform uses role-based access control, protected routes, token-based authentication, and secure session handling.",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="max-w-5xl mx-auto px-4 py-10"
    >
      <motion.h1
        variants={fadeUp}
        className="text-3xl font-bold mb-6 text-center"
      >
        Frequently Asked Questions
      </motion.h1>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="space-y-4"
      >
        {faqs.map((faq, index) => (
          <motion.div
            variants={fadeUp}
            key={index}
            className="collapse collapse-arrow bg-base-200 rounded-box"
          >
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              {faq.question}
            </div>
            <div className="collapse-content text-base-content/80">
              <p>{faq.answer}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FaqPage;
