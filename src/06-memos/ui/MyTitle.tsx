import { memo } from "react";

interface Props {
    title: string;
}

export const MyTitle = memo(({ title }: Props) => {
    console.log('MyTitle Rendered');
    return (
        <div>{title}</div>
    )
});
