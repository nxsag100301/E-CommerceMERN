import React, { useState } from 'react';
import { Button, Input, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import TableProductComponent from './TableProductComponent';
import { IoIosSearch } from "react-icons/io";
import AddNewProductModal from './AdminModal/AddNewProductModal';
import TableUserComponent from './TableUserComponent';
import AddNewUserModal from './AdminModal/AddNewUserModal';

const MainContentComponent = (props) => {
    const { caseNav } = props
    const [valueSearchProduct, setValueSearchProduct] = useState('');
    const [valueSearchUser, setValueSearchUser] = useState('');
    const [isShowAddnew, setIsShowAddnew] = useState(false)
    const [isShowAddnewUser, setIsShowAddnewUser] = useState(false)
    const [actionProductSuccess, setActionProductSuccess] = useState(false)
    const [actionUserSuccess, setActionUserSuccess] = useState(false)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <AddNewProductModal
                isShowAddnew={isShowAddnew}
                setIsShowAddnew={setIsShowAddnew}
                setActionSuccess={setActionProductSuccess} />
            <AddNewUserModal
                isShowAddnewUser={isShowAddnewUser}
                setIsShowAddnewUser={setIsShowAddnewUser}
                setActionSuccess={setActionUserSuccess}
            />
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >{caseNav === "dashboard" ?
                <div>Dashboard</div>
                :
                caseNav === "product"
                    ?
                    <div>
                        <div className='top-content' style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between" }}>
                            <Input style={{ width: "500px" }} placeholder="Tìm sản phẩm" prefix={<IoIosSearch />}
                                value={valueSearchProduct} onChange={(event) => setValueSearchProduct(event.target.value)} />
                            <Button onClick={() => setIsShowAddnew((true))}
                                type="primary">Thêm sản phẩm</Button>
                        </div>
                        <TableProductComponent valueSearch={valueSearchProduct}
                            actionSuccess={actionProductSuccess}
                            setActionSuccess={setActionProductSuccess} />
                    </div>
                    :
                    caseNav === "user"
                        ?
                        <div>
                            <div className='top-content' style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between" }}>
                                <Input style={{ width: "500px" }} placeholder="Tìm người dùng" prefix={<IoIosSearch />}
                                    value={valueSearchUser} onChange={(event) => setValueSearchUser(event.target.value)} />
                                <Button onClick={() => setIsShowAddnewUser((true))}
                                    type="primary">Thêm người dùng</Button>
                            </div>
                            <TableUserComponent valueSearch={valueSearchUser}
                                actionSuccess={actionUserSuccess}
                                setActionSuccess={setActionUserSuccess} />
                        </div>
                        :
                        <div>Not found</div>
                }

            </Content>
        </>
    );
};

export default MainContentComponent;


