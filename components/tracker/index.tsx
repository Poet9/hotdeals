"use client";
import { FormEvent, forwardRef, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

import Modal from "@/components/modal";
import Input from "@/components/input";
import { addEmail } from "@/lib/actions";

type ButtonProps = {
    productId: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Btn({ productId, type, className, id, children, ...props }, ref) {
    const [showModal, setshowModal] = useState(false);
    const [email, setemail] = useState("");
    const [showError, setshowError] = useState(false);
    const [loading, setloading] = useState(false);
    async function trackItemHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setloading(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setshowError(true);
            setloading(false);
            return null;
        }
        try {
            console.log({ productId });
            await addEmail(productId || "", email);
            setemail("");
            setloading(false);
            setshowModal(false);
        } catch (err: any) {
            console.log(`An error has occured ${err.message}`);
        }
    }
    return (
        <div>
            <button id={id} type={type} className={`text-white outline-none ${className}`} onClick={() => setshowModal(true)}>
                {children}
            </button>
            <Modal title="Track this item" hidden={!showModal} onClose={() => setshowModal(false)} className="min-h-96 text-black bg-slate-200">
                <form action="submit" onSubmit={trackItemHandler} className="flex flex-col gap-4">
                    <h2 className="text-xl text-slate-800"> Stay updated and never miss discounts of your desired product</h2>
                    <Input
                        name="email"
                        label="email"
                        onChange={(e: any) => setemail(e.target.value)}
                        placeholder="enter your email..."
                        autoFocus
                        value={email}
                        className="outline-none border-[1px]  border-cyan-950/50 rounded focus:bg-slate-100"
                    />
                    <p className={`text-red-500 text-sm p-1 ${showError ? "visible" : "hidden"}`}>Please enter a valid email.</p>
                    <button type="submit" disabled={loading} className="py-2 text-white rounded-lg bg-cyan-950 hover:bg-cyan-900">
                        {loading ? <ArrowPathIcon className="m-auto h-5 w-5 text-gray-200 motion-safe:animate-spin" /> : "Submit"}
                    </button>
                </form>
            </Modal>
        </div>
    );
});

export default Button;
