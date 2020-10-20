import { ethers } from 'ethers';
import React, { useContext, useState } from 'react';
import { SignerContext, TokenContext } from "./../buidler/BuidlerContext";
interface Props { }

export const MyToken: React.FC<Props> = () => {
    const token = useContext(TokenContext)
    const [signer] = useContext(SignerContext)
    const [inputName, setInputName] = useState("");


    const deployToken = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!token.factory) throw Error("Could not get token factory")
        if (!signer) throw Error("Could not get signer")
        const symbol = inputName.substr(0, 3).toUpperCase();
        const amount = ethers.utils.parseEther("5000")
        const myAddress = await signer.getAddress()
        const myToken = await token.factory.deploy(inputName, symbol, amount)
        await myToken.deployed()
        const currentBalance = await myToken.balanceOf(myAddress)
        console.log("My current balance is ", ethers.utils.formatEther(currentBalance))
        const tx = await myToken.transfer("0xC293ad28C1b6CA0B28843141A30579D9A43f2212", ethers.utils.parseEther("2000"))
        console.log("Sending 2000 " + inputName + " to 0xC293ad28C1b6CA0B28843141A30579D9A43f2212")
        await tx.wait()
        const newbalance = await myToken.balanceOf(myAddress)
        console.log("My new balance is ", ethers.utils.formatEther(newbalance))
    }
    return (
        <div>
            <input onChange={(e) => setInputName(e.target.value)}></input>
            <button onClick={(e) => deployToken(e)}>Create token and transfer</button>
        </div>
    )
}