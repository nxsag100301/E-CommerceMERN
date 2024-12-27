import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { Fragment } from 'react';
import PrivateRoute from './routes/PrivateRoute';
import ScrollToTop from './components/ScrollTop/ScrollTop';
import useAutoRefreshToken from './hooks/refreshTokenHook';

function App() {
  useAutoRefreshToken()
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {routes.map((item) => {
            const Page = item.page;
            const Layout = item.isShowHeader ? DefaultComponent : Fragment;

            return (
              <Route key={item.path} path={item.path}
                element={
                  item.isPrivate ? (
                    <PrivateRoute>
                      <Layout>
                        <Page />
                      </Layout>
                    </PrivateRoute>
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
