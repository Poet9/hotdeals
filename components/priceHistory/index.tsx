type Props = {
    value: number;
    currency: string;
    title: string;
};
const PriceHistory = ({ value, currency, title }: Props) => {
    return (
        <div className="flex-1 min-w-[200px]  flex-col gap-2 border-l-[3px] rounded-10 bg-white-100 px-5 py-4">
            <p className="text-base text-black-800">{title}</p>
            <div className="flex gap-1">
                <h3>{currency}</h3>
                <p className="text-2xl font-bold text-secondary">{value}</p>
            </div>
        </div>
    );
};

export default PriceHistory;
