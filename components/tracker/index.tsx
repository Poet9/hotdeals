"use client";
import { forwardRef, use, useState } from "react";
import Modal from "@/components/modal";
import Input from "../input";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Btn({ type, className, id, children, ...props }, ref) {
    const [showModal, setshowModal] = useState(false);
    const [loading, setloading] = useState(false);
    function trackItemHandler(e: any) {
        e.preventDefault();
        setloading(true);
    }
    return (
        <div>
            <button id={id} type={type} className={`text-white outline-none ${className}`} onClick={() => setshowModal(true)}>
                {children}
            </button>
            <Modal title="Track this item" hidden={!showModal} onClose={() => setshowModal(false)} className="min-h-96 bg-slate-200">
                <form action="submit" onSubmit={trackItemHandler} className="flex flex-col gap-4">
                    <Input
                        name="email"
                        label="email"
                        placeholder="enter your email..."
                        autoFocus
                        className="outline-none border-[1px] border-cyan-950/50 rounded focus:bg-slate-100"
                    />
                    <button type="submit" disabled={loading} className="py-2 text-white rounded-lg bg-cyan-950 hover:bg-cyan-900">
                        {loading ? <ArrowPathIcon className="h-5 w-5 text-white" /> : "Submit"}
                    </button>
                </form>
            </Modal>
        </div>
    );
});

export default Button;
