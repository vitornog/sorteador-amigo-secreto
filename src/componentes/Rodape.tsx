import React from "react"
import { useNavigate } from "react-router-dom"
import { useListaDeParticipantes } from "../state/hooks/UseListaDeParticipantes"

const Rodape = () =>{

    const participantes = useListaDeParticipantes()

    const navegarPara = useNavigate()

    const iniciar = () => {
        navegarPara('/sorteio')
    }

    return (
        <footer>
            <button disabled={participantes.length<3} onClick={iniciar}>Iniciar sorteio</button>
        </footer>
    )
}

export default Rodape