import { useEffect } from 'react'
import {useMoralis} from 'react-moralis'

export default function Header(){
    const {enableWeb3, account,isWeb3Enabled, Moralis, deactivateWeb3,isWeb3EnableLoading} = useMoralis()
    useEffect(()=>{
        if (isWeb3Enabled) {
            return
        }
        if (localStorage.getItem('connected')) {
            enableWeb3()
        }
    },[isWeb3Enabled])

    useEffect(()=>{
        Moralis.onAccountChanged((account)=>{
            if (account == null) {
                localStorage.removeItem('connected')
                deactivateWeb3()
            console.log(`account is null`)

            }
            console.log(`account changed to ${account}`)
        })
    },[])
    return (
        account
        ? (<div> Connected to {account.slice(0,6)}...{account.slice(account.length -4)} </div>) 
        : ( <button onClick={async ()=> {
            if (window !== 'undefined') {
                localStorage.setItem('connected','inject')
            }
            await enableWeb3()
        }} disabled={isWeb3EnableLoading}>Connect</button>)
       
    )
}