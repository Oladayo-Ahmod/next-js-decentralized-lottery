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
    const [playersNum,setPlayersNum] = useState("0")
    const [recentWinner,setRecentWinner] = useState("0")
    const dispatch = useNotification()

    const {runContractFunction : enterRaffle,isLoading,isFetching} = useWeb3Contract({
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

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getRecentWinner",
        params: {}
    })

    
    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getNumberOfPlayers",
        params: {}
    })

    async function updateUi(){
        const entranceFee = (await getEntranceFee()).toString()
        const players = (await getNumberOfPlayers()).toString()
        const winner = (await getRecentWinner()).toString()
        setEntranceFee(entranceFee)
        setPlayersNum(players)
        setRecentWinner(winner)
    }
    useEffect(()=>{
        if(isWeb3Enabled){       
           updateUi()
        }
    },[isWeb3Enabled])

    useEffect(()=>{
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    })

    const handleSuccess = async function(tx){
        await tx.wait(1)
        handleNewNotification(tx)
        updateUi()

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
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="messages-tab" data-bs-toggle="tab" data-bs-target="#messages" type="button" role="tab" aria-controls="messages" aria-selected="false">Messages</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Settings</button>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane fade active" id="home" role="tabpanel" aria-labelledby="home-tab">1</div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">2</div>
                <div className="tab-pane fade" id="messages" role="tabpanel" aria-labelledby="messages-tab">3</div>
                <div className="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">4</div>
            </div>
            { raffleAddress ? (
                
                <div>
                    
                    {isLoading || isFetching ? 
                        <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                     :<button className="btn btn-primary" onClick={async function(){await enterRaffle({
                         onSuccess : handleSuccess
                    })}} disabled={isLoading || isFetching}>Enter Raffle</button>}

                    <p className="mt-1">Entrance Fee : {ethers.utils.formatUnits(entranceFee,'ether')} ETH <br /></p>
                    <p>Number Of Player : {playersNum} <br /></p>
                    <p>Recent Winner : {recentWinner}</p>
                </div>
                ) : 'No Raffle Address Found'
                

            }
        </div>
    )
} 