
import { useLocation } from "react-router-dom";

const MyClassesDefault = () => {

    const {pathname} = useLocation() ;
    console.log(pathname) ;

    return (
        <div>
            default
        </div>
    );
};

export default MyClassesDefault;
