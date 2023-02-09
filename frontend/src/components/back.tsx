import { useNavigate } from 'react-router-dom'

const BackComponent = ({ to }: { to: string }) => {
  const navigate = useNavigate()

  const back = () => {
    navigate(to)
  }

  return (
    <button className="btn btn__normal" onClick={back}>
      Cancel
    </button>
  )
}

export default BackComponent
