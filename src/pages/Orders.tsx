import { ReactElement, useState, useEffect } from "react";
import TableHOC from "../components/admin/TableHOC"
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { CoustomError } from "../types/api-types";
import SkeletonLoader from "../components/SkeletonLoader";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { RootState } from "../redux/store";

type DataType = {
    _id: string;
    amount: number;
    discount: number;
    quantity: number;
    status: ReactElement;
    action: ReactElement;
}

const column: Column<DataType>[] = [
    {
        Header: "ID",
        accessor: "_id",
    },
    {
        Header: "Quantity",
        accessor: "quantity",
    },
    {
        Header: "Discount",
        accessor: "discount",
    },
    {
        Header: "Amount",
        accessor: "amount",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];


const Orders = () => {

    const { user } = useSelector((state: RootState) => state.userReducer);

    const { isLoading, data, error, isError } = useMyOrdersQuery(user?._id!);

    const [rows, setRows] = useState<DataType[]>([]);


    if (isError) return toast.error((error as CoustomError).data.message);
    useEffect(() => {
        if (data)
            setRows(
                data.orders.map((i) => ({
                    _id: i._id,
                    amount: i.total,
                    discount: i.discount,
                    quantity: i.orderItems.length,
                    status: (
                        <span
                            className={i.status === "Processing" ? "red" :
                                i.status === "Shipped" ? "green" : "purple"
                            }
                        >
                            {i.status}
                        </span>
                    ),
                    action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
                }))
            );
    }, [data]);



    const Table = TableHOC<DataType>(column, rows, "dashboard-product-box", "Orders", rows.length > 6)();
    return (
        <>
            <div className="orders-contain">
                <h1>My orders</h1>
                {isLoading ? <SkeletonLoader length={10} /> : Table}
            </div>
        </>
    )
}

export default Orders