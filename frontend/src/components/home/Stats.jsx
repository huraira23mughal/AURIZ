import { motion } from "framer-motion";
import {
    FaWallet,
    FaDollarSign,
    FaUsers,
    FaTasks,
} from "react-icons/fa";

const stats = [
    {
        icon: <FaWallet size={28} />,
        title: "Total Assets",
        value: "$1,250,000",
        color: "text-yellow-400",
    },
    {
        icon: <FaDollarSign size={28} />,
        title: "Today's Earnings",
        value: "$3,240",
        color: "text-green-400",
    },
    {
        icon: <FaUsers size={28} />,
        title: "Active Members",
        value: "25,846",
        color: "text-blue-400",
    },
    {
        icon: <FaTasks size={28} />,
        title: "Completed Tasks",
        value: "1,245,890",
        color: "text-pink-400",
    },
];

function Stats() {
    return (
        <section className="section py-24">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{
                            y: -10,
                            scale: 1.03,
                        }}
                        className="glass rounded-3xl p-8"
                    >
                        <div className={`${item.color} mb-6`}>
                            {item.icon}
                        </div>

                        <p className="text-gray-400">
                            {item.title}
                        </p>

                        <h2 className="text-4xl font-bold mt-4">
                            {item.value}
                        </h2>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default Stats;