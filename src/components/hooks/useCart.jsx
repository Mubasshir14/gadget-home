import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";


const useCart = () => {
    const { user } = useContext(AuthContext);
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://server-6685.onrender.com/carts?email=${user.email}`);
            return res.data
        }
    })
    return [cart, refetch]
};

export default useCart;