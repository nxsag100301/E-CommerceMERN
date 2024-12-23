import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import AdminPage from "../pages/AdminSide/AdminPage/AdminPage";
import DetailProductPage from "../pages/DetailProductPage/DetailProductPage";
import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
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
        path: '/detail-product',
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
        path: '*',
        page: NotFoundPage
    }
]
