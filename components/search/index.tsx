"use client";
import Input from "@/components/input";
import Button from "@/components/button";
import { useState } from "react";

const Search = () => {
    const [searching, setsearching] = useState(false);
    // check if url is valid aliexpress url
    const isAEUrl = (url: string): boolean => {
        try {
            const parsedUrl = new URL(url);
            if (
                !parsedUrl.hostname.includes("aliexpress.", parsedUrl.hostname.length - 14) ||
                !parsedUrl.hostname.includes("aliexpress.", parsedUrl.hostname.length - 15)
            ) {
                throw new Error("Unvalid Aliexpress url.");
            }
            return true;
        } catch (error: any) {
            console.warn(`please enter a valid url ${error.message}`);
            return false;
        }
    };
    function handleSubmit(e: any) {
        e.preventDefault();
        setsearching(true);
        const isValidUrl = isAEUrl(e.target.querySelector("input").value);
        try {
        } catch (err: any) {
            console.warn(`Error parsing ${err.message}`);
        } finally {
            e.target.querySelector("input").value = "";
            setsearching(false);
        }
    }
    return (
        <form className="flex w-fit gap-0 m-4" onSubmit={handleSubmit}>
            <Input
                placeholder="past link here..."
                name="search"
                className="bg-slate-600 rounded-l outline-none text-white focus:bg-slate-700"
                required
            />
            <Button
                type="submit"
                className={`bg-[#a36f] px-3 my-1 rounded-r-lg`}
                disabled={searching}
            >
                {searching ? <span className="text-white animate-spin">&#11119;</span> : "Search"}
            </Button>
        </form>
    );
};

export default Search;
