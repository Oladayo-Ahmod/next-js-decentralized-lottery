import { useEffect } from 'react'
import {useMoralis} from 'react-moralis'

export default function Header(){
    const {enableWeb3, account,isWeb3Enabled} = useMoralis()
    useEffect(()=>{
        if (isWeb3Enabled) {
            return
        }
        if (localStorage.getItem('connected')) {
            enableWeb3()
        }
    },[isWeb3Enabled])
    return (
        account
        ? (<div> Connected to {account.slice(0,6)}...{account.slice(account.length -4)} </div>) 
        : ( <button onClick={async ()=> {
            if (window !== 'undefined') {
                localStorage.setItem('connected','inject')
            }
            await enableWeb3()
        }}>Connect</button>)
       
    )
}