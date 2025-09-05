import { memo } from "react";

interface Props {
    subtitle: string;

    callMyAPI: () => void;
}

export const MySubtitle = memo(({ subtitle, callMyAPI }: Props) => {
    console.log('MySubtitle Rendered');
    return (
        <>
            <h6>{subtitle}</h6>

            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={callMyAPI}
            >
                Llamar a función
            </button>
        </>
    )
});
