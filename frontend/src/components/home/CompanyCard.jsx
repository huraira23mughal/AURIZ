import { motion } from "framer-motion";
import { FaArrowRight, FaChartLine } from "react-icons/fa";

function CompanyCard({
    image,
    company,
    roi,
    earnings,
}) {
    return (
        <motion.div
            whileHover={{
                y: -10,
                scale: 1.02,
            }}
            transition={{ duration: .3 }}
            className="glass rounded-3xl overflow-hidden"
        >
            <div className="overflow-hidden">

                <motion.img
                    whileHover={{
                        scale: 1.08,
                    }}
                    transition={{ duration: .5 }}
                    src={image}
                    alt={company}
                    className="w-full h-56 object-cover"
                />

            </div>

            <div className="p-6">

                <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-bold">

                        {company}

                    </h2>

                    <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">

                        VIP

                    </div>

                </div>

                <div className="mt-6 space-y-3">

                    <div className="flex justify-between">

                        <span className="text-gray-400">

                            Daily ROI

                        </span>

                        <span className="text-green-400">

                            {roi}

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-400">

                            Earnings

                        </span>

                        <span>

                            {earnings}

                        </span>

                    </div>

                </div>

                <button className="goldButton w-full mt-8 py-4 flex justify-center items-center gap-3">

                    Invest Now

                    <FaArrowRight />

                </button>

            </div>

        </motion.div>
    );
}

export default CompanyCard;