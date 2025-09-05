import { use, useEffect, type Usable } from "react"
import { getUserAction, type User } from "./api/get-user-action";

interface Props{
    getUser: Usable<User>
}

export const ClientInformation = ({getUser}: Props) => {
    const user = use(getUser);
    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h2 className="text-2xl font-thin text-white">
                {user?.name} - #{user?.id}
            </h2>

            <p className="text-white/80 text-md">
                {user?.location}
            </p>
            <p className="text-white/80 text-sm">
                {user?.role}
            </p>
        </div>
    )
}
