import { useParams } from 'react-router-dom' 

export default function Bounty() {
    const { id } = useParams()

    return (
        <div>
            <h1>Bounty Details</h1>

            show details for id {id}
        </div>
    )
}