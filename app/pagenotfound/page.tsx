import Link from "next/link";

const Pagenotfound = () => {
    return (
        <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
            <h1 className="text-5xl">Page not found</h1>
            <h3>make sure you copied the url correctly</h3>
            <Link href={"/"} className="flex text-blue-600">
                <p className="animate-bounce">&#11206;</p> Go back to homepage
            </Link>
        </div>
    );
};

export default Pagenotfound;
