import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../util/api";

export default function User () {
    const [dataSource, setDataSource] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        const fetchUser = async() => {
            const res = await getUserApi();
            if (!res?.message) {
                setDataSource(res);
            }else{
                api.error({
                    message: "Unauthorized",
                    description: res.message
                })
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
        <>
            {contextHolder}
            <div style={{padding: 20}}>
            <Table 
                bordered
                dataSource={dataSource} columns={columns} 
                rowKey={"_id"}/>
             </div>
        </>
        
    )
}