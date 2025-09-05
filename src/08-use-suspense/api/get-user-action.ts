export interface User {
    id: number;
    name: string;
    location: string;
    role: string;
}

export const getUserAction = async(id: number) => {
    await new Promise( resolve => setTimeout(resolve, 2000) );

    return {
        id: id,
        name: 'Miguel Hernández',
        location: 'Caracas - Venezuela',
        role: 'Frontend Developer'
    };
}