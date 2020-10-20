import React, { useContext } from 'react';
import { GreeterContext } from '../buidler/BuidlerContext';

interface Props { }

/* BONUS - Deploy a new greeter in frontend and call the function for its greet varaible. */
export const GreeterDeploy: React.FC<Props> = () => {
    const greeter = useContext(GreeterContext)
    const deployGreeter = async () => {
        if (greeter.factory) {
            const newGreeter = await greeter.factory.deploy("Hello World")
            await newGreeter.deployed()
            const greeting = await newGreeter.greet()
            console.log("Deployed a new Greeter and it sayed: ", greeting)
        }
    }

    return (
        <button onClick={(e) => deployGreeter()}>Deploy a new Greeter</button>
    )
}