import { useParams, Link, useNavigate } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function EditBounty() {
    const [form, setForm] = useState({
        name: '',
        wantedFor: '',
        client: '',
        reward: 0,
        lastSeen: '',
        ship: '',
        captured: false
    })
    const [errorMessage, setErrorMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getBounty = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bounty/${id}`)
                // console.log(response.data)
                setForm(response.data)
            } catch (err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getBounty() 
    }, [])
    
    const handleSubmit = async e => {
        try {
            e.preventDefault()
            // axios.put/.post('url', data for the reqeust body)
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/bounty/${id}`, form)
            // navigate back to the details page for this bounty
            navigate(`/bounties/${id}`)
            
        } catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }

    return (
        <div>
            <h1>Edit Bounty:</h1>

            <p>{errorMessage}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input 
                        type='text'
                        id='name'
                        value={form.name}
                        placeholder='bounty name...'
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor='wantedFor'>Wanted For:</label>
                    <input 
                        type='text'
                        id='wantedFor'
                        value={form.wantedFor}
                        placeholder='enter their crimes...'
                        onChange={e => setForm({ ...form, wantedFor: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor='client'>Client:</label>
                    <input 
                        type='text'
                        id='client'
                        value={form.client}
                        placeholder='enter client...'
                        onChange={e => setForm({ ...form, client: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor='reward'>Reward:</label>
                    <input 
                        type='number'
                        id='reward'
                        value={form.reward}
                        onChange={e => setForm({ ...form, reward: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor='lastSeen'>Last Seen:</label>
                    <input 
                        type='text'
                        id='lastSeen'
                        value={form.lastSeen}
                        placeholder='last seen at...'
                        onChange={e => setForm({ ...form, lastSeen: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor='ship'>Ship:</label>
                    <input 
                        type='text'
                        id='ship'
                        value={form.ship}
                        placeholder='ship...'
                        onChange={e => setForm({ ...form, ship: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor='captured'>Captured:</label>
                    <input 
                        type='checkbox'
                        id='captured'
                        value={form.captured}
                        onChange={() => setForm({ ...form, captured: !form.captured  })}
                    />
                </div>

                <button type='submit'>Submit Edits</button>
            </form>

            <Link to={`/bounties/${id}`}>Go Back</Link>
        </div>
    )
}