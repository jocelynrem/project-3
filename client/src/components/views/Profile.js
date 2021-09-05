
export default function Profile({ name, email, }) {
    const teacherId = localStorage.getItem('teacher_id');
    console.log('this is the teachers Id from Profile:', teacherId)
    return (
        <>
            <h1 className='font-light text-3xl m-2 text-md-green'>{name}'s Profile</h1>
            <p className='m-2'>Email: {email}</p>
        </>
    )
}