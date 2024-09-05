import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useReview = () => {
    
    const { refetch, data: review = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axios.get('https://server-6685.onrender.com/reviews');
            return res.data
        }
    })
    return [review, refetch]
};

export default useReview;