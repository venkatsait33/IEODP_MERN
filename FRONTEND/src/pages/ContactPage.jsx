import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { fadeIn, fadeUp } from "../utils/motionUtils";
import {motion} from "framer-motion"

const ContactPage = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log("Contact form:", data);
        toast.success("Message sent successfully");
        reset();
    };

    return (
        <motion.div initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}  className="max-w-5xl  mx-auto px-6 py-10 space-y-8">
            <motion.div variants={fadeUp}>
                <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
                <p className="text-base-content/70">
                    Have questions, partnership ideas, or feedback? We'd love to hear from you.
                </p>
            </motion.div>

            <motion.div initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn} className="grid md:grid-cols-2 gap-6">
                <motion.div variants={fadeUp} className="card bg-base-200 p-6 shadow space-y-3">
                    <h2 className="text-xl font-semibold">Company Information</h2>
                    <p><strong>IEODP Headquarters</strong></p>
                    <p>Hyderabad, Telangana, India</p>
                    <p><strong>Email:</strong> info@ieodp.com</p>
                    <p><strong>Phone:</strong> +91 90000 00000</p>
                    <p className="text-base-content/70">
                        For business inquiries, partnerships, or demos, contact us using the form.
                    </p>
                </motion.div>

                <motion.div variants={fadeUp} className="card bg-base-200 p-6 shadow">
                    <h2 className="text-xl font-semibold mb-3">Send Us a Message</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <input
                            className="input input-bordered w-full"
                            placeholder="Full Name"
                            {...register("name", { required: true })}
                        />

                        <input
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="Email Address"
                            {...register("email", { required: true })}
                        />

                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows={4}
                            placeholder="Your message"
                            {...register("message", { required: true })}
                        />

                        <button className="btn btn-accent w-full">Send Message</button>
                    </form>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ContactPage;
