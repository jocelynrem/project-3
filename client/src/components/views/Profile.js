import React from 'react';
// import { Link } from 'react-router-dom';
// import { MODIFY_TEACHER } from '../../utils/mutations'
// import { useMutation } from '@apollo/client';
import ProfileCard from '../ProfileCard';
import UpdateProfile from '../UpdateProfile';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import Auth from '../../../src/utils/auth';

export default function Profile({ firstName, lastName, email, id }) {

    const [open, setOpen] = React.useState(false);

    // const teacherId = localStorage.getItem('teacher_id');
    // const [formState, setFormState] = useState({
    //     id,
    //     firstName,
    //     lastName,
    //     email
    // });

    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
        },
    }));

    const classes = useStyles();

    // const [modifyTeacher, { error, data }] = useMutation(MODIFY_TEACHER);

    // const handleChange = (event) => {
    //     const { name, value } = event.target

    //     setFormState({
    //         ...formState,
    //         [name]: value,
    //     });
    // };
    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const { data } = await modifyTeacher({
    //             variables: { ...formState },
    //         });

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ProfileCard
                firstName={firstName}
                lastName={lastName}
                email={email}
                handleOpen={handleOpen}
            />

            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <UpdateProfile
                            onClose={handleClose}
                            firstName={firstName}
                            lastName={lastName}
                            email={email}
                            id={id}
                        />
                    </div>
                </Fade>
            </Modal>
        </>
    )
};