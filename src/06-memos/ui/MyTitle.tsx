interface Props {
    title: string;
}

export const MyTitle = ({ title }: Props) => {
    console.log('MyTitle Rendered');
    return (
        <div>{title}</div>
    )
}
