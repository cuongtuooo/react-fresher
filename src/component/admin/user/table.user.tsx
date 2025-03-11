import { getUsersAPI } from '@/services/api';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { useRef, useState } from 'react';


const columns: ProColumns<IUserTable>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '_id',
        dataIndex: '_id',
        hideInSearch: true,
        render(dom, entity, index, action, schema) {
            return (
                <a href="#">{entity._id}</a>
            )
        },
    },
    {
        title: 'Full Name',
        dataIndex: 'fullName',
    },
    {
        title: 'email',
        dataIndex: 'email',
    },
    {
        title: 'Create at',
        dataIndex: 'createdAt',

    },
    {
        title: 'Action',
        hideInSearch: true,
        render(dom, entity, index, action, schema) {
            return (
                <>
                    <EditTwoTone
                        twoToneColor="#f57800"
                        style={{ cursor: "pointer", marginRight: 15 }}
                    />
                    <DeleteTwoTone
                        twoToneColor="#ff4d4f"
                        style={{ cursor: "pointer" }}
                    />
                </>
            )
        },

    },
];

const TableUser = () => {
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });
    const actionRef = useRef<ActionType>();
    return (
        <>
            <ProTable<IUserTable>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(sort, filter);
                    const res = await getUsersAPI();
                    if (res.data) {
                        setMeta(res.data.meta);
                    }

                    return {
                        // data: data.data,
                        data: res.data?.result,
                        page: 1,
                        success: true,
                        // "total": 30
                        total: res.data?.meta.total
                    }

                }}
                rowKey="_id"
                pagination={
                    {
                        current: meta.current,
                        pageSize: meta.pageSize,
                        showSizeChanger: true,
                        total: meta.total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                headerTitle="Table user"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            actionRef.current?.reload();
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>

                ]}
            />
        </>
    );
};

export default TableUser;