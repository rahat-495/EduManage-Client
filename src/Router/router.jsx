
import {createBrowserRouter} from 'react-router-dom' ;
import Root from '../Layout/Root';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/Register/SignUp';
import AddSchool from '../Pages/AddSchool/AddSchool';
import AddClass from '../Pages/AddClass/AddClass';
import YourSchools from '../Pages/YourSchools/YourSchools';
import SchoolsDetails from '../Pages/SchoolsDetails/SchoolsDetails';
import UpdateSchool from '../Pages/Update/UpdateSchool/UpdateSchool';
import YourClassSubs from '../Pages/YourClassSubs/YourClassSubs';
import ViewClassFromS from '../Pages/ViewClassFromS/ViewClassFromS';
import ProfileRoot from '../Layout/ProfileRoot';
import ProfileStatic from '../Page/ProfilePages/ProfileStatic/ProfileStatic';
import MyProfile from '../Page/ProfilePages/MyProfile/MyProfile';
import AdditionalInfo from '../Page/AdditionalInfo/AdditionalInfo';
import Address from '../Page/ProfilePages/Address/Address';
import ContactUs from '../Pages/ContactUs/ContactUs';
import Schools from '../Pages/Schools/Schools';
import AddmissionForm from '../Pages/AddmissionForm/AddmissionForm';
import UpdateAddmissionFrom from '../Pages/Update/UpdateAddmissionFrom/UpdateAddmissionFrom';
import SchoolGradesAddReqs from '../Pages/School&GradesAddReqs/SchoolGradesAddReqs';
import StudentInfo from '../Pages/StudentInfo/StudentInfo';
import MyAddmissionReq from '../Pages/MyAddmissionReq/MyAddmissionReq';
import AllStudents from '../Pages/AllStudents/AllStudents';
import JoinedStudentInfo from '../Pages/JoinedStudentInfo/JoinedStudentInfo';
import MyClasses from '../Pages/MyClasses/MyClasses';
import ClassMates from '../Pages/ClassMates/ClassMates';
import YourClasses from '../Pages/YourClasses/YourClasses';

const router = createBrowserRouter([
    {
        path : '/' ,
        element : <Root/>,
        children : [
            {
                path : '/' ,
                element : <Home/> ,
            },
            {
                path : '/login' ,
                element : <Login/> ,
            },
            {
                path : '/signUp' ,
                element : <SignUp/> ,
            },
            {
                path : '/addSchool' ,
                element : <AddSchool/> ,
            },
            {
                path : '/addClass' ,
                element : <AddClass/> ,
            },
            {
                path : '/yourSchools' ,
                element : <YourSchools/> ,
            },
            {
                path : '/myClasses' ,
                element : <MyClasses/> ,
            },
            {
                path : '/yourClasses' ,
                element : <YourClasses/> ,
            },
            {
                path : '/schoolsDetails/:id' ,
                element : <SchoolsDetails/> ,
            },
            {
                path : '/update/:id' ,
                element : <UpdateSchool/> ,
            },
            {
                path : '/yourClasses/subjects/:id' ,
                element : <YourClassSubs/> ,
            },
            {
                path : '/viewClasses/:id' ,
                element : <ViewClassFromS/> ,
            },
            {
                path : '/contact-us' ,
                element : <ContactUs/> ,
            },
            {
                path : '/schools' ,
                element : <Schools/> ,
            },
            {
                path : '/addmissionForm/:id' ,
                element : <AddmissionForm/> ,
            },
            {
                path : '/myAddmissionRequests' , // for students
                element : <MyAddmissionReq/> , // for students
            },
            {
                path : '/classMates' , // for students
                element : <ClassMates/> , // for students
            },
            {
                path : '/updateAddmissionForm/:id' ,
                element : <UpdateAddmissionFrom/> ,
            },
            {
                path : '/studentInfoForAddmission/:id' , // show the student details
                element : <StudentInfo/> ,
            },
            {
                path : '/school&GradesAddReqs' , // for teacher
                element : <SchoolGradesAddReqs/> , // for teacher
            },
            {
                path : '/allStudents' , // for teacher
                element : <AllStudents/> , // for teacher
            },
            {
                path : '/joinedStudentInfo/:id' , // for teacher
                element : <JoinedStudentInfo/> , // for teacher
            },
        ] 
    },
    {
        path : '/profile' ,
        element : <ProfileRoot/> ,
        children : [
            {
                path : '/profile' ,
                element : <ProfileStatic/> ,
            },
            {
                path : 'myProfile' ,
                element : <MyProfile/> ,
            },
            {
                path : 'additional-info' ,
                element : <AdditionalInfo/> ,
            },
            {
                path : 'address' ,
                element : <Address/> ,
            },
        ]
    },
])

export default router ;
