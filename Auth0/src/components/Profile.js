import { useAuth0 } from '@auth0/auth0-react'


const Profile = () => {

    const { user, isAuthenticated } = useAuth0()


    return (
        isAuthenticated && (
            <article>

                {/* {JSON.stringify(user)} */}

                {user?.picture && <img src={user.picture} alt="profile pic" />}
                <h2>{user?.name}</h2>
                <h5>User's Info</h5>
                <ul>
                    {Object.keys(user).map((objKey, index) => <li key={index}><strong>{objKey}</strong> : {user[objKey]}</li>)}
                </ul>
            </article>
        )

    )
}

export default Profile