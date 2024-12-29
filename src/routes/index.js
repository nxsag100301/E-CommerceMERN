import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import AdminPage from "../pages/AdminSide/AdminPage/AdminPage";
import CartPage from "../pages/CartPage/CartPage";
import DetailOrder from "../pages/DetailOrder/DetailOrder";
import DetailProductPage from "../pages/DetailProductPage/DetailProductPage";
import HomePage from "../pages/HomePage/HomePage";
import ManageOrder from "../pages/ManageOrder/ManageOrder";
import OrderPage from "../pages/OrderPage/OrderPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import VnpayReturn from "../pages/ReturnVNPAYPage/ReturnVNPAYPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/product',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: 'product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/detail-product/:id',
        page: DetailProductPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: UserProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isPrivate: true
    },
    {
        path: '/cart',
        page: CartPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/manage-order',
        page: ManageOrder,
        isShowHeader: true
    },
    {
        path: '/detail-order/:id',
        page: DetailOrder,
        isShowHeader: true
    },
    {
        path: '/vnpay_return',
        page: VnpayReturn,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]
