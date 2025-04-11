import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Register from "./pages/Register";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="flex flex-col gap-8 md:gap-16">
          {/* <Navbar /> */}
          <Home />
        </div>
      ),
    },
    // {
    //   path: "/about",
    //   element: (
    //     <div className="flex flex-col">
    //       <Navbar />
    //       <About />
    //     </div>
    //   ),
    // },
    // {
    //   path: "/contact",
    //   element: (
    //     <div>
    //       <Navbar />
    //       <Contact />
    //     </div>
    //   ),
    // },
    // {
    //   path: "*",
    //   element: (
    //     <div>
    //       <Navbar />
    //       <Error />
    //     </div>
    //   ),
    // },
    {
      path: "/login",
      element: (
        <div>
          {/* <Navbar /> */}
          <OpenRoute>{/* <Login /> */}</OpenRoute>
        </div>
      ),
    },
    {
      path: "/register",
      element: (
        <div>
          {/* <Navbar /> */}
          <OpenRoute>
            <Register />
          </OpenRoute>
        </div>
      ),
    },
    // {
    //   path: "/forgot-password",
    //   element: (
    //     <div className="w-full h-full">
    //       <Navbar />
    //       <OpenRoute>
    //         <ForgotPassword />
    //       </OpenRoute>
    //     </div>
    //   ),
    // },
    // {
    //   path: "/update-password/:id",
    //   element: (
    //     <div className="w-full h-full">
    //       <Navbar />
    //       <OpenRoute>
    //         <ResetPassword />
    //       </OpenRoute>
    //     </div>
    //   ),
    // },
    // {
    //   path: "/verify-email",
    //   element: (
    //     <div className="w-full h-full">
    //       <Navbar />
    //       <OpenRoute>
    //         <VerifyEmail />
    //       </OpenRoute>
    //     </div>
    //   ),
    // },
    // {
    //   element: (
    //     <div className="flex flex-grow flex-col">
    //       <Navbar />
    //       <PrivateRoute>
    //         <Dashboard />
    //       </PrivateRoute>
    //     </div>
    //   ),
    //   children: [
    //     {
    //       path: "/dashboard/my-profile",
    //       element: <MyProfile />,
    //     },
    //     {
    //       path: "/dashboard/settings",
    //       element: <Settings />,
    //     },
    //     ...(user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
    //       ? [
    //           {
    //             path: "/dashboard/add-course",
    //             element: <AddCourse />,
    //           },
    //           {
    //             path: "/dashboard/my-courses",
    //             element: <MyCourses />,
    //           },
    //           {
    //             path: "/dashboard/edit-course/:courseId",
    //             element: <EditCourse />,
    //           },
    //           {
    //             path: "/dashboard/instructor",
    //             element: <InstructorDashboard />,
    //           },
    //         ]
    //       : [
    //           {
    //             path: "/dashboard/cart",
    //             element: <Cart />,
    //           },
    //           {
    //             path: "/dashboard/enrolled-courses",
    //             element: <EnrolledCourses />,
    //           },
    //           {
    //             path: "/dashboard/student",
    //             element: <StudentDashboard />,
    //           },
    //           {
    //             path: "/dashboard/purchase-history",
    //             element: <PurchaseHistory />,
    //           },
    //         ]),
    //   ],
    // },
    // {
    //   path: "/catalog/:catalogName",
    //   element: (
    //     <div className="">
    //       <Navbar />
    //       <Catalog />
    //     </div>
    //   ),
    // },
    // {
    //   path: "/course/:courseId",
    //   element: (
    //     <div className="">
    //       <Navbar />
    //       <CourseDetails />
    //     </div>
    //   ),
    // },
    // {
    //   element: (
    //     <div className="flex flex-grow flex-col">
    //       <Navbar />
    //       <PrivateRoute>
    //         <ViewCourse />
    //       </PrivateRoute>
    //     </div>
    //   ),
    //   children: [
    //     ...(user?.accountType === ACCOUNT_TYPE.STUDENT
    //       ? [
    //           {
    //             path: "/view-course/:courseId/section/:sectionId/sub-section/:subSectionId",
    //             element: <VideoDetails />,
    //           },
    //         ]
    //       : []),
    //   ],
    // },
  ]);
  return (
    <div className="w-screen h-screen overflow-x-hidden box-border font-inter flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
