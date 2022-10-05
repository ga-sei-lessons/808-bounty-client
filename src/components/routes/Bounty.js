import { useParams, Link, useNavigate, useLinkClickHandler } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Bounty() {
    const [bounty, setBounty] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getBounty = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bounty/${id}`)
                // console.log(response.data)
                setBounty(response.data)
            } catch (err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getBounty() 
    }, [])
    
    const handleDelete = async () => {
        try {
            // axios to the backend to delete this bounty
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/bounty/${id}`)
            // after deletion, navigate back to /bounties
            navigate('/bounties')
        } catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }

    // const components = state.map(thing => {
    //     return (
    //         <Component 
    //             onClick={() => handler(thing)}
    //         />
    //     )
    // })

    return (
        <div>
            <h1>Bounty Details</h1>

            <p>{errorMessage}</p>
            
            <div>
                <Link to={`/bounties/${id}/edit`}>
                    <button>Edit</button>
                </Link>

                <button
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>

            <div>
                <h2>{bounty.name}</h2>

                <p>wanted for: {bounty.wantedFor}</p>

                <p>client: {bounty.client}</p>

                <p>ship: {bounty.ship}</p>

                <h3>Reward: {bounty.reward}</h3>

                <p>last seen: {bounty.lastSeen}</p>

                <h4>{bounty.captured ? 'in custody' : 'still at large'}</h4>
            </div>
        </div>
    )
}