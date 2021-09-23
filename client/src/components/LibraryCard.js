/* eslint-disable eqeqeq */
import { HiX } from "react-icons/hi";

const LibraryCard = ({ bookId, title, authors, description, copiesAvailable, onClose }) => {

    const closeModal = () => {
        onClose()
    }

    return (
        <>
            <div className="flex container mx-auto bg-blue-900 w-8/12 pb-6 pt-1 px-6">
                <div className="" key={bookId}>
                    <div className="flex justify-end pb-1">
                        <button
                            type="button"
                            className="rounded-md text-gray-400 hover:text-gray-500"
                            onClick={closeModal}
                        >
                            <span className="sr-only">Close</span>
                            <HiX className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="bg-white rounded-lg">
                        <div className="sm:p-1 rounded-t-lg bg-gray-200 flex justify-between">
                            <div className="w-9/12 self-end pl-3">
                                <h3 className="font-medium sm:text-md text-gray-900">{title} </h3>
                            </div>
                            <div className="w-3/12 self-end text-right pr-2">
                                <h3 className="sm:text-md text-gray-900">Copies: {copiesAvailable} </h3>
                            </div>
                        </div>

                        <div className="border-t border-blue-900 pt-1 sm:px-4">
                            <dl className="grid grid-cols-1 gap-x-4 mt-3 gap-y-2 sm:grid-cols-1">
                                <div className="sm:col-span-1">
                                    <dt className="uppercase text-blue-800">{authors}</dt>
                                </div>
                            </dl>
                        </div>
                        <div className="border-t border-blue-900 mx-4 sm:px-6 text-left">
                        </div>
                        <div className="sm:px-4 pb-4">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-1">
                                <div className="sm:col-span-1">
                                    <dd className="mt-1 text-xs text-gray-900">
                                        {description}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LibraryCard;