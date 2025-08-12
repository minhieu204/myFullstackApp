import { Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../util/api";

export default function User () {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        const fetchUser = async() => {
            const res = await getUserApi();
            if (res) {
                setDataSource(res);
            }
        }
        fetchUser();
    }, [])

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
    ];

    return(
        <div style={{padding: 20}}>
            <Table 
                bordered
                dataSource={dataSource} columns={columns} 
                rowKey={"_id"}/>
        </div>
    )
}