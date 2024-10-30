
import {createBrowserRouter} from 'react-router-dom' ;
import Root from '../Layout/Root';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/Register/SignUp';
import AddSchool from '../Pages/AddSchool/AddSchool';
import YourSchools from '../Pages/YourSchools/YourSchools';
import SchoolsDetails from '../Pages/SchoolsDetails/SchoolsDetails';
import UpdateSchool from '../Pages/Update/UpdateSchool/UpdateSchool';
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
import AddGrade from '../Pages/AddGrade/AddGrade';
import YourGradeDetails from '../Pages/YourGradeDetails/YourGradeDetails';
import MessageRoot from '../Layout/MessageRoot';
import MessageStatic from '../Messages/MessageStatic/MessageStatic';
import MessagePage from '../Messages/MessagePage/MessagePage';
import YourGrades from '../Pages/YourGrades/YourGrades';
import UploadSubject from '../Pages/UploadSubject/UploadSubject';
import UploadSubStatic from '../Pages/UploadSubject/Components/UploadSubStatic';
import ModulePage from '../Pages/UploadSubject/Components/ModulePage';
import AssignmentPage from '../Pages/UploadSubject/Components/AssignmentPage';

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
                path : '/addGrade' ,
                element : <AddGrade/> ,
            },
            {
                path : '/yourSchools' ,
                element : <YourSchools/> ,
            },
            {
                path : '/myClasses' , // for students
                element : <MyClasses/> , // for students
            },
            {
                path : '/yourGrades' ,
                element : <YourGrades/> ,
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
                path : '/yourGrades/details/:id' , // for teachers
                element : <YourGradeDetails/> , // for teachers
            },
            {
                path : '/yourGrades/details/:id/:subject' , // for teachers
                element : <UploadSubject/> , // for teachers
                children : [
                    {
                        path : '' ,
                        element : <UploadSubStatic/>,
                    },
                    {
                        path : 'modules/:id' ,
                        element : <ModulePage/>,
                    },
                    {
                        path : 'assignment/:id' ,
                        element : <AssignmentPage/>,
                    },
                ]
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
    {
        path : '/message' ,
        element : <MessageRoot/> ,
        children : [
            {
                path : '/message',
                element : <MessageStatic/>
            },
            {
                path : '/message/:receiverUid',
                element : <MessagePage/>
            },
        ]
    },
])

export default router ;
