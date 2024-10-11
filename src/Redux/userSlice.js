
import { createSlice } from "@reduxjs/toolkit";
import UAParser from "ua-parser-js";

const parser = new UAParser();
const deviceInfo = parser.getResult();

const initialState = {
    _id : '',
    name: '',
    email: '',
    image: '',
    studentUid: '',
    role: "",
    isBlock: false,
    isFired: false,
    isjoined : '' ,
    isjoinedModalSeen : false ,
    applyForTeacher: "No",
    schools: [],
    grades: [],
    removedDevice: [],
    devicesInfo: [
        {
            deviceName: deviceInfo?.os?.name + " " + deviceInfo?.os?.version,
            loginDate: new Date().toLocaleDateString(),
            loginTime: new Date().toLocaleTimeString(),
            loginShift: new Date().toLocaleTimeString("en-US", { hour: "numeric", hour12: true }).split(" ")[1],
            isRemoved: false,
        },
    ],
};

export const userSlice = createSlice({
    name : "user" ,
    initialState ,
    reducers : {
        setUser : (state , action) => {
            state._id = action.payload?._id;
            state.name = action.payload?.name;
            state.email = action.payload?.email;
            state.image = action.payload?.image;
            state.studentUid = action.payload?.studentUid;
            state.role = action.payload?.role;
            state.isBlock = action.payload?.isBlock;
            state.isFired = action.payload?.isFired;
            state.isjoined = action.payload?.isjoined;
            state.applyForTeacher = action.payload?.applyForTeacher;
            state.schools = action.payload?.schools;
            state.grades = action.payload?.grades;
            state.removedDevice = action.payload?.removedDevice;
            state.isjoined = action.payload?.isjoined ;
            state.isjoinedModalSeen = action.payload?.isjoinedModalSeen ;
            state.devicesInfo = [
                {
                    deviceName: deviceInfo?.os?.name + " " + deviceInfo?.os?.version,
                    loginDate: new Date().toLocaleDateString(),
                    loginTime: new Date().toLocaleTimeString(),
                    loginShift: new Date().toLocaleTimeString("en-US", { hour: "numeric", hour12: true }).split(" ")[1],
                    isRemoved: false,
                },
            ];
        },
    }
})

export default userSlice.reducer ;
export const { setUser } = userSlice.actions ;
