import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import Loader from '../Loader/Loader';

const OrderDetails = () => {
    const { tran_id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the order by transaction ID
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`https://server-6685.onrender.com/order/${tran_id}`);
                setOrder(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [tran_id]);

    if (loading) return <Loader/>
    if (error) return <p>Error: {error}</p>;

    // Destructure order details for easy access
    const {
        name,
        mobile,
        address,
        upzilla,
        zilla,
        postcode,
        email,
        transectionId,
        cartItems,
        paidStatus
    } = order;

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text('Order Details', 14, 20);

        doc.text(`Name: ${name || ''}`, 14, 30);
        doc.text(`Mobile: ${mobile || ''}`, 14, 40);
        doc.text(`Address: ${address || ''}`, 14, 50);
        doc.text(`Upzilla: ${upzilla || ''}`, 14, 60);
        doc.text(`Zilla: ${zilla || ''}`, 14, 70);
        doc.text(`Postcode: ${postcode || ''}`, 14, 80);
        doc.text(`Email: ${email || ''}`, 14, 90);
        doc.text(`Transaction ID: ${transectionId || ''}`, 14, 100);
        doc.text(`Product Name: ${cartItems[0]?.name || ''}`, 14, 110);
        doc.text(`Price: ${cartItems[0]?.price || ''}`, 14, 120);
        doc.text(`Paid Status: ${paidStatus ? 'Paid' : 'Not Paid'}`, 14, 130);

        doc.save('order-details.pdf');
    };

    return (
        <div className='max-w-screen-xl mx-auto min-h-[calc(100vh-250px)] p-4 md:p-8'>
            <div className="">
                <div className="max-w-4xl mx-auto shadow-md border-[#59C6D2] rounded bg-[#59C6D2]/5">
                    <div className="p-6">
                        <div className="text-[#59C6D2] font-bold text-xl md:text-2xl font-cinzel flex items-center justify-center">
                            Order Details
                        </div>
                        <div className="flex flex-col md:flex-row justify-between mb-6 items-center">
                            <img src={cartItems[0]?.image || ''} alt="" className='w-16' />
                        </div>
                        <div className="overflow-x-auto">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-[#59C6D2] text-sm font-semibold mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={name || ''}
                                        readOnly
                                        className="w-full p-2 border border-[#59C6D2] rounded bg-[#59C6D2]/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#59C6D2] text-sm font-semibold mb-2">Mobile</label>
                                    <input
                                        type="text"
                                        value={mobile || ''}
                                        readOnly
                                        className="w-full p-2 border border-[#59C6D2] rounded bg-[#59C6D2]/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#59C6D2] text-sm font-semibold mb-2">Address</label>
                                    <input
                                        type="text"
                                        value={address || ''}
                                        readOnly
                                        className="w-full p-2 border border-[#59C6D2] rounded bg-[#59C6D2]/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#59C6D2] text-sm font-semibold mb-2">Upzilla</label>
                                    <input
                                        type="text"
                                        value={upzilla || ''}
                                        readOnly
                                        className="w-full p-2 border border-[#59C6D2] rounded bg-[#59C6D2]/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#59C6D2] text-sm font-semibold mb-2">Zilla</label>
                                    <input
                                        type="text"
                                        value={zilla || ''}
                                        readOnly
                                        className="w-full p-2 border border-[#59C6D2] rounded bg-[#59C6D2]/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#59C6D2] text-sm font-semibold mb-2">Postcode</label>
                                    <input
                                        type="text"
                                        value={postcode || ''}
                                        readOnly
                                        className="w-full p-2 border border-[#59C6D2] rounded bg-[#59C6D2]/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#59C6D2] text-sm font-semibold mb-2">Email</label>
                                    <input
                                        type="text"
                                        value={email || ''}
                                        readOnly
                                        className="w-full p-2 border border-[#59C6D2] rounded bg-[#59C6D2]/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#59C6D2] text-sm font-semibold mb-2">Transaction ID</label>
                                    <input
                                        type="text"
                                        value={transectionId || ''}
                                        readOnly
                                        className="w-full p-2 border border-[#59C6D2] rounded bg-[#59C6D2]/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#59C6D2] text-sm font-semibold mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        value={cartItems[0]?.name || ''}
                                        readOnly
                                        className="w-full p-2 border border-[#59C6D2] rounded bg-[#59C6D2]/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#59C6D2] text-sm font-semibold mb-2">Price</label>
                                    <input
                                        type="text"
                                        value={cartItems[0]?.price || ''}
                                        readOnly
                                        className="w-full p-2 border border-[#59C6D2] rounded bg-[#59C6D2]/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#59C6D2] text-sm font-semibold mb-2">Paid Status</label>
                                    <input
                                        type="text"
                                        value={paidStatus ? 'Paid' : 'Not Paid'}
                                        readOnly
                                        className="w-full p-2 border border-[#59C6D2] rounded bg-[#59C6D2]/10"
                                    />
                                </div>
                            </form>
                            <div className='flex justify-center items-center'>
                                <button
                                    onClick={handleDownloadPDF}
                                    className="mt-6 px-4 py-2 bg-[#59C6D2] text-white rounded hover:bg-[#59C6D2]/40 clear-start "
                                >
                                    Download 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
