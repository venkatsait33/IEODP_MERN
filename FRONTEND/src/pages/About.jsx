import { fadeIn, fadeUp } from "../utils/motionUtils";
import { motion } from "framer-motion";

const AboutPage = () => {
    return (
        <motion.div initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}  className="max-w-6xl  mx-auto px-6 py-10 space-y-8">
            <motion.div variants={fadeUp}>
                <h1 className="text-3xl font-bold mb-2">About IEODP</h1>
                <p className="text-base-content/70 leading-relaxed">
                    Intelligent Enterprise Operations & Decision Platform (IEODP) is a unified
                    enterprise-grade system designed to manage workflows, approvals, compliance,
                    and decision intelligence across organizations.
                </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6">
                <div className="card bg-base-200 p-6 shadow">
                    <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
                    <p className="text-base-content/70">
                        To empower enterprises with structured workflows, transparency, and
                        AI-assisted insights that enable faster, smarter, and compliant decisions.
                    </p>
                </div>

                <div className="card bg-base-200 p-6 shadow">
                    <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
                    <p className="text-base-content/70">
                        To become the backbone of enterprise operational intelligence by unifying
                        people, processes, and data into one intelligent platform.
                    </p>
                </div>
            </motion.div>

            <motion.div variants={fadeUp} className="card bg-base-200 p-6 shadow">
                <h2 className="text-xl font-semibold mb-2">Why IEODP?</h2>
                <ul className="list-disc list-inside text-base-content/70 space-y-1">
                    <li>Role-driven workflows with full audit trail</li>
                    <li>Append-only decision history for compliance</li>
                    <li>Enterprise dashboards and analytics</li>
                    <li>Secure, scalable, and modular architecture</li>
                    <li>AI-ready decision support foundation</li>
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default AboutPage;
