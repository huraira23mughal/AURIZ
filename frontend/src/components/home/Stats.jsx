import { motion } from "framer-motion";
import {
    FaWallet,
    FaDollarSign,
    FaUsers,
    FaTasks,
} from "react-icons/fa";

const stats = [
    {
        icon: <FaWallet size={24} className="md:w-[28px] md:h-[28px]" />,
        title: "Total Assets",
        value: "$1,250,000",
        color: "text-yellow-400",
    },
    {
        icon: <FaDollarSign size={24} className="md:w-[28px] md:h-[28px]" />,
        title: "Today's Earnings",
        value: "$3,240",
        color: "text-green-400",
    },
    {
        icon: <FaUsers size={24} className="md:w-[28px] md:h-[28px]" />,
        title: "Active Members",
        value: "25,846",
        color: "text-blue-400",
    },
    {
        icon: <FaTasks size={24} className="md:w-[28px] md:h-[28px]" />,
        title: "Completed Tasks",
        value: "1,245,890",
        color: "text-pink-400",
    },
];

function Stats() {
    return (
        <section className="section py-12 md:py-24 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
                {stats.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{
                            y: -6,
                            scale: 1.02,
                        }}
                        className="glass rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-between"
                    >
                        <div>
                            <div className={`${item.color} mb-4 md:mb-6`}>
                                {item.icon}
                            </div>

                            <p className="text-gray-400 text-sm md:text-base">
                                {item.title}
                            </p>
                        </div>

                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-3 md:mt-4 text-white tracking-wide">
                            {item.value}
                        </h2>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default Stats;