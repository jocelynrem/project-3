import bookworm from '../images/CA101-7.png';


const ProfileCard = ({ firstName, lastName, email, handleOpen }) => {
    return (
        <>
            <div className="flex items-center justify-center py-12">
                <div className="py-8 px-4 max-w-xl flex flex-col lg:flex-row items-center rounded shadow bg-white dark:bg-gray-800">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-100">
                        <img src={bookworm} alt='bookworm' />
                    </div>
                    <div className="mt-5 lg:mt-0 pl-4">
                        <div className="flex-rows">
                            <p className="text-xl pb-1 font-semibold leading-5 text-gray-800 lg:pr-20">{firstName} {lastName}</p>
                            <p className="text-base pb-1 leading-5 text-gray-800 lg:pr-20">{email}</p>
                        </div>
                        <div className="pt-2 lg:flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="lg:flex hidden items-center mt-2 md:mt-4 lg:mt-0 cursor-pointer">
                                    <p className="text-sm font-semibold leading-5 text-right text-indigo-700">Update Profile</p>
                                    <svg onClick={handleOpen} className="ml-3 w-4" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 35 30" fill="none">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2.61236 17.143H28.231L20.3867 26.4859C19.6223 27.3945 19.7476 28.7466 20.6631 29.503C21.5807 30.2616 22.941 30.1373 23.7053 29.2288L34.5012 16.3715C34.5854 16.2708 34.6264 16.153 34.6891 16.0415C34.7409 15.9515 34.8035 15.8744 34.8424 15.7758C34.9395 15.5294 34.9978 15.2701 34.9978 15.0087C34.9978 15.0065 35 15.0022 35 15.0001C35 14.998 34.9978 14.9937 34.9978 14.9915C34.9978 14.7301 34.9395 14.4708 34.8424 14.2244C34.8035 14.1258 34.7409 14.0487 34.6891 13.9587C34.6264 13.8472 34.5854 13.7294 34.5012 13.6287L23.7053 0.771434C23.2757 0.263573 22.6625 0 22.0449 0C21.557 0 21.0668 0.162858 20.6631 0.497146C19.7476 1.25358 19.6223 2.60573 20.3867 3.51431L28.231 12.8572H2.61236C1.4205 12.8572 0.453186 13.8172 0.453186 15.0001C0.453186 16.183 1.4205 17.143 2.61236 17.143Z"
                                            fill="#4338CA"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProfileCard;
