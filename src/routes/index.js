import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import DetailProductPage from "../pages/DetailProductPage/DetailProductPage";
import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

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
        path: '/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/detail-product',
        page: DetailProductPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]
