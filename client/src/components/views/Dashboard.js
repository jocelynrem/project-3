import books from "../../images/CA101-16.png";

export default function Dashboard({ name }) {
    return (
        <>
            <div className="w-full flex items-center justify-center">
                <div className="w-full flex flex-col items-center py-16 md:py-12 rounded-lg">
                    <div className="w-full flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <img className="h-16" src={books} alt="profile" />
                            <p className="mt-2 text-2xl uppercase font-semibold text-center text-dark">{name}'s Library</p>
                        </div>
                    </div>
                    <div className="flex items-center mt-7">
                        <div className="text-center pr-5 border-r">
                            <p className="text-dk-gray">Total Books</p>
                            <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-md-green">280</p>
                        </div>
                        <div className="ml-7 text-center pr-5 border-r">
                            <p className="text-dk-gray">Books Checked Out</p>
                            <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-md-green">10</p>
                        </div>
                        <div className="ml-7 text-center">
                            <p className="text-dk-gray">Books Past Due</p>
                            <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-md-green">3</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}