import { useEffect, useState } from "react";
import { useWeb3Contract} from "react-moralis";
import {useMoralis} from 'react-moralis'
import {abi, contractAddress} from '../constants'
import {ethers} from 'ethers'
import { useNotification } from "web3uikit";

export default function LotteryEntrance(){
    const {chainId : chainIdHex,isWeb3Enabled} = useMoralis()
    const chainId = parseInt(chainIdHex)
    // const raffleAddress = chainId in contractAddress ? contractAddress[chainId][0] : null
    const raffleAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
    const [entranceFee,setEntranceFee] = useState("0")
    const dispatch = useNotification()

    const {runContractFunction : enterRaffle} = useWeb3Contract({
        abi : abi,
        contractAddress : raffleAddress,
        functionName : 'enterRaffle',
        params : {},
        msgValue : entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getEntranceFee",
        params: {}
    })

    useEffect(()=>{
        if(isWeb3Enabled){
            async function updateUi(){
              const entranceFee = (await getEntranceFee()).toString()
              setEntranceFee(entranceFee)
            }
           updateUi()
        }
    },[isWeb3Enabled])

    const handleSuccess = async function(tx){
        await tx.wait(1)
        handleNewNotification(tx)
    }
    const handleNewNotification = function(){
        dispatch({
            type : 'info',
            title : 'Tx Notification',
            message : 'Transaction Completed',
            position : 'topR',
            icon : 'bell'
        })
    }

    return (
        <div>
            { raffleAddress ? (
                <div>
                    <button onClick={async function(){await enterRaffle({
                         onSuccess : handleSuccess
                    })}}>Enter Raffle</button>
                    Entrance Fee : {ethers.utils.formatUnits(entranceFee,'ether')} ETH
                </div>
                ) : 'No Raffle Address Found'
                

            }
           
        </div>
    )
} 