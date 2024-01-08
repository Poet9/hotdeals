"use client";
import Input from "@/components/input";
import Button from "@/components/button";
import { useState } from "react";
import { scrapeAndStoreProduct } from "@/lib/actions";

const Search = () => {
    const [searching, setsearching] = useState(false);
    // check if url is valid aliexpress url
    const isAEUrl = (url: string): { isValidUrl: boolean; url: string } => {
        try {
            const parsedUrl = new URL(url);
            if (
                !parsedUrl.hostname.includes("aliexpress.", parsedUrl.hostname.length - 14) ||
                !parsedUrl.hostname.includes("aliexpress.", parsedUrl.hostname.length - 15)
            ) {
                throw new Error("Unvalid Aliexpress url.");
            }
            return { isValidUrl: true, url };
        } catch (error: any) {
            console.warn(`please enter a valid url ${error.message}`);
            return { isValidUrl: false, url };
        }
    };
    async function handleSubmit(e: any) {
        e.preventDefault();
        setsearching(true);
        try {
            const { isValidUrl, url } = isAEUrl(e.target.querySelector("input").value);
            if (!isValidUrl) throw new Error("Unvalid url");
            const idkWhat = await scrapeAndStoreProduct(url);
        } catch (err: any) {
            console.warn(`Error parsing ${err.message}`);
        } finally {
            // e.target.querySelector("input").value = "";
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
