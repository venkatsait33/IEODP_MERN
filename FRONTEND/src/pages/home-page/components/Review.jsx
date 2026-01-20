import { AlignLeft, CircleCheckBig, Star, StarHalf } from "lucide-react"
import { motion } from "framer-motion"
import { fadeIn, fadeUp } from "../../../utils/motionUtils"

const reviewsData = [
    {
        id: 1,
        name: 'John Doe',
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        rating: 4.5,
    },
    {
        id: 2,
        name: 'Jane Doe',
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        rating: 4.5,
    },
    {
        id: 3,
        name: 'John Doe',
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        rating: 4.5,
    },
    {
        id: 3,
        name: 'John Doe',
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        rating: 4.5,
    },
    {
        id: 3,
        name: 'John Doe',
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        rating: 4.5,
    }

]

const Reviews = () => {
    return (
        <motion.section initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn} className='md:h-[500px] max-sm:flex max-sm:flex-col md:flex'>
            <motion.div variants={fadeUp} className='md:w-[20%] '>
                <div className='bg-[#1F8268] h-[500px] flex justify-center items-center flex-col'>
                    <div className='bg-[#62A795] btn btn-circle w-22 h-22'>
                        <AlignLeft className='w-12 h-12 ' />
                    </div>
                    <div className='text-[30px]  max-sm:text-center text-white'>
                        <p >Feed back
                        </p>
                        <p >
                            from satisfied </p>
                        <p >
                            Customers
                        </p>
                    </div>

                </div>
            </motion.div>


            <motion.div initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn} className='md:w-[80%] bg-[#EAF8F4] flex justify-center items-center '>
                <div className="carousel rounded-box ">
                    {
                        reviewsData.map((item) => (
                            <motion.div variants={fadeUp} className="carousel-item " key={item.id}>
                                <div className='card w-[300px] ml-10 mt-10 mb-10'>
                                    <div className="flex items-center justify-center md:avatar ">
                                        <div className="rounded md:h-32 md:w-32 ">
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" className='rounded-md max-sm:w-24 max-sm:h-24' />
                                        </div>
                                    </div>
                                    <div className='text-black shadow-2xl card-body rounded-xl '>
                                        <div className='flex items-center gap-2'>
                                            <h1 className='text-xl'>{item?.name}</h1>
                                            <div className='mt-2 btn p-4 btn-outline btn-xs text-[#1F8268]'>
                                                <span><CircleCheckBig /></span>
                                                <span>
                                                    verified Customer
                                                </span>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-2'> <span> 4.5</span>
                                            <div className='flex gap-1 '>
                                                <Star className='text-amber-400' />
                                                <Star className='text-amber-400' />
                                                <Star className='text-amber-400' />
                                                <Star className='text-amber-400' />
                                                <StarHalf className='text-amber-400' />
                                            </div></div>
                                        <div className=''>
                                            <p className='text-md'>"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam excepturi nisi, perferendis veniam adipisci deserunt praesentium unde non est assumenda."</p>
                                        </div>
                                    </div>
                                </div>

                            </motion.div>
                        ))
                    }
                </div>

            </motion.div>
        </motion.section>
    )
}

export default Reviews