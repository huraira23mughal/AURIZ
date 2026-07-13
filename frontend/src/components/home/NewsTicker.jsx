import { motion } from "framer-motion";
import { FaBullhorn } from "react-icons/fa";

const news = [
    "🔥 Welcome to AURIZ Premium Investment Platform",
    "💰 New VIP Plans Available Now",
    "🎁 Complete Daily Tasks & Earn Rewards",
    "📈 Assets Updated Every Minute",
    "🚀 Invite Friends & Earn Referral Bonus",
];

function NewsTicker() {
    return (
        <div className="glass rounded-2xl overflow-hidden mt-14">

            <div className="flex items-center">

                {/* Left */}

                <div className="bg-yellow-400 text-black px-8 py-4 flex items-center gap-3 font-bold">

                    <FaBullhorn />

                    LIVE NEWS

                </div>

                {/* Right */}

                <div className="overflow-hidden w-full">

                    <motion.div
                        className="flex gap-20 whitespace-nowrap py-4 text-gray-200"
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 22,
                            ease: "linear",
                        }}
                    >
                        {news.map((item, index) => (
                            <span key={index} className="font-medium">
                                {item}
                            </span>
                        ))}

                    </motion.div>

                </div>

            </div>

        </div>
    );
}

export default NewsTicker;