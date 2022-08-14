import {useMoralis} from 'react-moralis'

export default function Header(){
    const {enableWeb3, account} = useMoralis()
    return (
        account
        ? (<div>Connected</div>) 
        : ( <button onClick={async ()=> {await enableWeb3()}}>Connect</button>)
       
    )
}