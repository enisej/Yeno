import React, {useContext} from 'react';
import {Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";

import ProfileDataItem from "../../components/Items/ProfileDataItem";
import UserProfileItems from "../../components/Items/UserProfileItems";
import {Context} from "../../index";
import {ToastContainer} from "react-toastify";


const Profile = observer(() => {

const {user} = useContext(Context)

    return (
        <Container className=" p-4 mt-3 shadow bg-light">
            <ToastContainer/>
            <ProfileDataItem/>
            {user.user.status === 'USER' ?
                <UserProfileItems/>
                : <></>
            }

        </Container>
    );
});

export default Profile;