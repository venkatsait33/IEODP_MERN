import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion"
import { fadeIn, fadeUp } from "../utils/motionUtils";
const SupportPage = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log("Support request:", data);
        toast.success("Support request submitted successfully");
        reset();
    };

    return (
        <motion.div initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn} className="max-w-5xl
         mx-auto px-6 py-10 space-y-8">
            <motion.div variants={fadeUp}>
                <h1 className="text-3xl font-bold mb-2">Customer Support</h1>
                <p className="text-base-content/70">
                    Need help? Our support team is here to assist you with any issues,
                    questions, or feature requests.
                </p>
            </motion.div>

            <motion.div initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn} className="grid md:grid-cols-2 gap-6">
                <motion.div variants={fadeUp} className="card bg-base-200 p-6 shadow space-y-3">
                    <h2 className="text-xl font-semibold">Support Channels</h2>
                    <p><strong>Email:</strong> support@ieodp.com</p>
                    <p><strong>Phone:</strong> +91 90000 00000</p>
                    <p><strong>Working Hours:</strong> Mon–Fri, 9AM–6PM</p>
                    <p className="text-base-content/70">
                        For critical production issues, please mark your request as <b>High Priority</b>.
                    </p>
                </motion.div>

                <motion.div variants={fadeUp} className="card bg-base-200 p-6 shadow">
                    <h2 className="text-xl font-semibold mb-3">Raise a Support Ticket</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <input
                            className="input input-bordered w-full"
                            placeholder="Subject"
                            {...register("subject", { required: true })}
                        />

                        <select
                            className="select select-bordered w-full"
                            {...register("priority", { required: true })}
                        >
                            <option value="">Select Priority</option>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>

                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows={4}
                            placeholder="Describe your issue"
                            {...register("description", { required: true })}
                        />

                        <button className="btn btn-primary w-full">Submit Request</button>
                    </form>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default SupportPage;
