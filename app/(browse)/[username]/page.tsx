interface UserPageProps {
    params: {
        username: string //this is whatever value is passed into the url doesnt have to be username
    }
}

const UserPage = ({
    params
}: UserPageProps) => {
    return(
        <div>
            User: {params.username}
        </div>
    )
}

export default UserPage