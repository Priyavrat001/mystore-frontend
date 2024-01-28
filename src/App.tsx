import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux"
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { getUser } from "./redux/api/userApi";
import { UserReducerInitialState } from "./types/reducer-types";
import ProtectedRoute from "./components/ProtectedRoute";
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));

// Admin routes importing

const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);


const App = () => {

  const { user, loading } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);

        dispatch(userExist(data.user));

      }
      else {
        dispatch(userNotExist());;
      }
    })
  }, [])


  return loading ? (
    <Loader />
  ) : (
    <Router>
      {/* Header */}
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          {/* Not logged In Route */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />
          {/* Logged In User Routes */}
          <Route>

            <Route path="/shipping" element={
              <ProtectedRoute isAuthenticated={user ? true : false}>
                <Shipping />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute isAuthenticated={user ? true : false}>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/order/:id" element={
              <ProtectedRoute isAuthenticated={user ? true : false}>
                <OrderDetails />
              </ProtectedRoute>
            } />
          </Route>
          {/* Admin Routes */}
          <Route
            // element={
            //   <ProtectedRoute
            //     isAuthenticated={true}
            //     adminOnly={true}
            //     admin={user?.role === "admin" ? true : false}
            //   />
            // }
          >
            <Route path="/admin/dashboard" element={
              <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}>

                <Dashboard />

              </ProtectedRoute>

            } />
            <Route path="/admin/product" element={

              <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}>

                <Products />

              </ProtectedRoute>
            } />

            <Route path="/admin/customer" element={
              <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}>
                <Customers />
              </ProtectedRoute>
            } />
            <Route path="/admin/transaction" element={
              <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}>
                <Transaction />
              </ProtectedRoute>
            } />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={
              <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}>
                <Barcharts />
              </ProtectedRoute>

            } />
            <Route path="/admin/chart/pie" element={

              <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}>
                <Piecharts />
              </ProtectedRoute>} />
            <Route path="/admin/chart/line" element={

              <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}>
                <Linecharts />
              </ProtectedRoute>
            } />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={

              <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}>
                <Coupon />
              </ProtectedRoute>
            } />
            <Route path="/admin/app/stopwatch" element={

              <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}>

                <Stopwatch />
              </ProtectedRoute>
            } />
            <Route path="/admin/app/toss" element={

              <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}>

                <Toss />
              </ProtectedRoute>
            } />

            {/* Management */}
            <Route path="/admin/product/new" element={

              <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}>

                <NewProduct />
              </ProtectedRoute>
            } />

            <Route path="/admin/product/:id" element={

              <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}>

                <ProductManagement />

              </ProtectedRoute>} />

            <Route
              path="/admin/transaction/:id"
              element={

                <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}>

                  <TransactionManagement />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App