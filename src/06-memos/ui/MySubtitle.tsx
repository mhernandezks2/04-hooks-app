interface Props {
    subtitle: string;
}

export const MySubtitle = ({ subtitle }: Props) => {
    console.log('MySubtitle Rendered');
    return (
        <>
            <h6>{subtitle}</h6>

            <button>Llamar a función</button>
        </>
    )
}
