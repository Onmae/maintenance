import {Outlet} from "react-router-dom";

export const PublicLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default PublicLayout