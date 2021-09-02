export default function Footer(props) {
    return (
        <footer id="footer" className="relative z-50 bg-dark">
            <div className="flex flex-col justify-center items-center">
                <p className="my-2 text-xs lg:text-sm leading-none text-lt-gray">
                    Copyright {props.year} Bookworm Classroom Library Management. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}