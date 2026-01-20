
const Footer = () => {
    return (

        <footer className="bg-base-200   border-t">
            <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6 text-sm ">

                {/* Brand */}
                <div>
                    <h3 className="font-bold text-lg mb-2">IEODP</h3>
                    <p className="text-base-content/70">
                        Intelligent Enterprise Operations & Decision Platform – enabling structured workflows, compliance, and decision intelligence.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-semibold mb-2">Quick Links</h4>
                    <ul className="space-y-1">
                        <li><a href="/about" className="hover:text-primary">About</a></li>
                        <li><a href="/support" className="hover:text-primary">Support</a></li>
                        <li><a href="/contact" className="hover:text-primary">Contact</a></li>
                        <li><a href="/login" className="hover:text-primary">Login</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-semibold mb-2">Contact</h4>
                    <p>Email: support@ieodp.com</p>
                    <p>Phone: +91 90000 00000</p>
                    <p className="text-base-content/60 mt-2">
                        © {new Date().getFullYear()} IEODP. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};


export default Footer