import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./socket";

// ✅ Lazy imports
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessagesManagement = lazy(() => import("./pages/admin/MessageManagement"));
const AdminChatbot = lazy(() => import("./pages/admin/AdminChatbot"));

// ✅ Admin Layout
import AdminLayout from "./components/layout/AdminLayout";

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // ✅ Fetch user on app load
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch(() => dispatch(userNotExists()));
  }, [dispatch]);

  // ✅ Block rendering until user data is loaded
  if (loader) return <LayoutLoader />;

  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          {/* ✅ User-Protected Routes */}
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} redirect="/login" />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          {/* ✅ Guest-only Login */}
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          {/* ✅ Admin Login (Public) */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* ✅ Admin-Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectRoute user={user?.isAdmin} redirect="/admin">
                <AdminLayout />
              </ProtectRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="chats" element={<ChatManagement />} />
            <Route path="messages" element={<MessagesManagement />} />
            <Route path="chatbot" element={<AdminChatbot />} />
          </Route>

          {/* ✅ 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
