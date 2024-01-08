import { ReactElement, useState } from "react";
import TableHOC from "../components/admin/TableHOC"
import { Column } from "react-table";
import { Link } from "react-router-dom";

type DataRype = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
}

const column: Column<DataRype>[] = [
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
]

const Orders = () => {
    const [rows, setRows] = useState<DataRype[]>([
        {
           _id:"dffdsfs",
            amount: 4555,
            quantity: 50,
            discount: 200,
            status: <span className="red">Processing</span>,
            action: <Link to={`/orders/${"dffdsfs"}`}>View</Link>,
        }
    ]);

    const Table = TableHOC<DataRype>(column, rows, "dashboard-product-box", "Orders", rows.length > 6)();
    return (
        <>
            <div className="orders-contain">
                <h1>My orders</h1>
                {Table}
            </div>
        </>
    )
}

export default Orders