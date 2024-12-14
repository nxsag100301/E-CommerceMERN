import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { Fragment } from 'react';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map(item => {
            const Page = item.page
            const Layout = item.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={item.path} path={item.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
