import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
    {
        name: "Ali Khan",
        country: "Pakistan",
        review:
            "AURIZ helped me earn a stable daily income. The platform is easy to use and very secure.",
    },
    {
        name: "Sarah Ahmed",
        country: "UAE",
        review:
            "The investment plans are excellent. Withdrawals are fast and the support team is very helpful.",
    },
    {
        name: "John Smith",
        country: "United Kingdom",
        review:
            "A premium investment experience with a beautiful interface and great returns.",
    },
];

function Testimonials() {
    return (
        <section className="section py-16 md:py-24">

            <div className="text-center mb-16">

                <p className="text-yellow-400 uppercase tracking-[6px]">
                    Testimonials
                </p>

                <h2 className="text-3xl md:text-5xl font-bold mt-4">
                    What Our
                    <span className="text-yellow-400"> Investors Say</span>
                </h2>

                <p className="text-gray-400 mt-4 text-lg">
                    Excellent <span className="text-yellow-400 font-bold">9.99/10</span> rating based on 25,000+ user reviews.
                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {testimonials.map((user, index) => (

                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="glass rounded-3xl p-8"
                    >

                        <div className="flex gap-1 text-yellow-400 mb-5">

                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />

                        </div>

                        <p className="text-gray-300 leading-8">

                            "{user.review}"

                        </p>

                        <div className="mt-8">

                            <h3 className="font-bold text-xl">

                                {user.name}

                            </h3>

                            <p className="text-gray-400">

                                {user.country}

                            </p>

                        </div>

                    </motion.div>

                ))}

            </div>

        </section>
    );
}

export default Testimonials;