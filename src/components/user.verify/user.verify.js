import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export default function UserVerify() {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { token } = useParams();

    useEffect(() => {
        wait(4000).then(() => {
            setIsConfirmed(true);
        });
    }, []);

    return isConfirmed ? (<span>Successfully confirmed</span>) : (<span>{token}</span>);
}