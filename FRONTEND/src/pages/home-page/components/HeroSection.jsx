import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, fadeUp, staggerContainer, } from "../../../utils/motionUtils";

// const fadeUp = {
//     hidden: { opacity: 0, y: 40 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
// };



const HeroSection = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <section className={`h-full ${menuOpen ? "overflow-hidden" : ""}`}>
            {/* HEADER */}
            <header className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-6 w-full">
                <h1 className="font-semibold">IEDOP</h1>

                {/* NAV MENU */}
                <nav
                    className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center 
                    max-md:h-full transition-[width] backdrop-blur flex-col md:flex-row flex gap-8 
                    ${menuOpen ? "max-md:w-full" : "max-md:w-0"}`}
                >
                    <Link to='/about' className="hover:text-primary">About</Link>
                    <Link to='/support' className="hover:text-primary">Support</Link>
                    <Link to='/contact' className="hover:text-primary">Contact</Link>
                    <Link to='/faq' className="hover:text-primary">Faq</Link>


                    <button className="md:hidden" onClick={() => setMenuOpen(false)}>
                        ✕
                    </button>
                </nav>

                {/* DESKTOP BUTTON */}
                <div className="hidden md:flex space-x-4">
                    <Link
                        className=" btn btn-primary px-5 py-2 rounded-full text-sm font-medium transition"
                        to="/login"
                    >
                        Login
                    </Link>
                </div>

                {/* MOBILE MENU */}
                <button className="md:hidden" onClick={() => setMenuOpen(true)}>
                    ☰
                </button>
            </header>

            {/* MAIN CONTENT */}
            <motion.main
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex-grow flex flex-col items-center px-6 sm:px-10 max-w-7xl mx-auto w-full"
            >
                <motion.button
                    variants={fadeUp}
                    className="mt-10 mb-6 flex items-center space-x-2 border border-primary-600 text-primary text-xs rounded-full px-4 pr-1.5 py-1.5 hover:bg-primary-50 transition"
                >
                    <span>AI-assisted decision making</span>
                    <span className="flex items-center justify-center p-1 rounded-full bg-primary">
                        <ArrowRight className="text-white" />
                    </span>
                </motion.button>

                <motion.h1
                    variants={fadeUp}
                    className="text-center font-semibold text-2xl sm:text-4xl md:text-4xl max-w-3xl leading-tight"
                >
                    Intelligent Enterprise Operations & Decision Platform{" "}
                    <span className="text-primary-600">AI-Insights</span>
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="mt-4 text-center text-gray-600 max-w-md text-sm sm:text-base leading-relaxed"
                >
                    A unified platform to manage workflows, ensure compliance, and drive data-backed decisions across your organization.
                </motion.p>
                <div className="flex mt-8 gap-3 items-center">

                    <motion.button
                        variants={fadeUp}
                        className=" btn btn-primary px-6 pr-2.5 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2  transition"
                    >
                        <Link to='/login'>Get Started</Link>
                        <ArrowRight />
                    </motion.button>
                    <motion.button variants={fadeUp}>
                        <Link to="/workflowprocess" className="btn btn-outline">View Workflow</Link>
                    </motion.button>
                </div>


                {/* IMAGES */}
                <motion.div
                    variants={fadeIn}
                    className="mt-12 flex max-md:overflow-x-auto gap-6 max-w-4xl w-full pb-6"
                >
                    {[
                        "https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?q=80&w=735&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=687&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=687&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=764&auto=format&fit=crop",
                    ].map((img, index) => (
                        <motion.img
                            key={index}
                            variants={fadeUp}
                            src={img}
                            alt=""
                            className="w-36 h-44 rounded-lg hover:-translate-y-1 transition duration-300 object-cover flex-shrink-0"
                        />
                    ))}
                </motion.div>
            </motion.main>
        </section>
    );
};

export default HeroSection;
