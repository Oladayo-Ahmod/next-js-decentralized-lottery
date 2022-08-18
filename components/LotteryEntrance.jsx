import { useEffect, useState } from "react";
import { useWeb3Contract} from "react-moralis";
import {useMoralis} from 'react-moralis'
import {abi, contractAddress} from '../constants'
import {ethers} from 'ethers'
export default function LotteryEntrance(){
    const {chainId : chainIdHex,isWeb3Enabled} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddress ? contractAddress[chainId][0] : null
    const [entranceFee,setEntranceFee] = useState("0")
    // const {runContractFunction : enterRaffle} = useWeb3Contract({
    //     abi : abi,
    //     contractAddress : raffleAddress,
    //     functionName : 'enterRaffle',
    //     params : {},
    //     // msgValue : '1'
    // })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', // specify the networkId
        functionName: "getEntranceFee",
        params: {}
    })

    useEffect(()=>{
        if(isWeb3Enabled){
            async function updateUi(){
              const entranceFeeFromCall = (await getEntranceFee()).toString()
              setEntranceFee(ethers.utils.formatUnits(entranceFeeFromCall,'ether'))
            }
           updateUi()
        }
    },[isWeb3Enabled])

    return (
        <div>
            {entranceFee}
        </div>
    )
} 