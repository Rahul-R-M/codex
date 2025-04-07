import { lazy } from "react";
import { RouteConstant } from "./RouteConstant";

const Login = lazy(()=>import('../module/Login/Login'));
const Signup = lazy(()=>import('../module/Signin/Signin'));
const Admindashboard = lazy(()=>import('../module/AdminDashboard/Admindashboard'));
const Userdashboard = lazy(()=>import('../module/UserDashboard/Userdashboard'));

const routeConfig = {
    public:[
        {
            path:RouteConstant.LOGIN,
            element:<Login/>
        },
        {
            path:RouteConstant.SIGNUP,
            element:<Signup/>
        }
    ],
    private:[
        {
            path:RouteConstant.ADMIN_DASHBOARD,
            element:<Admindashboard/>
        },
        {
            path:`${RouteConstant.USER_DASHBOARD}/:id`,
            element:<Userdashboard/>
        }
    ]
}

export default routeConfig;