/* eslint-disable eqeqeq */
import { HiX } from "react-icons/hi";

const LibraryCard = ({ bookId, title, authors, description, copiesAvailable, onClose }) => {

    const closeModal = () => {
        onClose()
    }

    return (
        <>
            <div className="flex container mx-auto items-center justify-center">
                <div className="shadow p-2 sm-rounded-lg" key={bookId}>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="rounded-md text-gray-400 hover:text-gray-500"
                            onClick={closeModal}
                        >
                            <span className="sr-only">Close</span>
                            <HiX className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="p-4 sm:px-6 bg-gray-200 inline-flex w-full justify-between">
                        <div>
                            <h3 className="text-xl leading-6 font-medium text-gray-900">{title} </h3>
                        </div>
                        <div>
                            <h3 className="text-xl leading-6 font-medium text-gray-900">{copiesAvailable} </h3>
                        </div>
                    </div>

                    <div className="border-t border-blue-900 pt-1 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 mt-5 gap-y-2 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <dt className="font-medium uppercase text-blue-800">{authors}</dt>
                            </div>
                        </dl>
                    </div>
                    <div className="border-t border-blue-900 mx-4 py-2 sm:px-6 text-left">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-1">
                            <div>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {description}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LibraryCard;