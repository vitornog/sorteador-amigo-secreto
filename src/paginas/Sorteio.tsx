import { useState } from "react"
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes"
import { useResultadoDoSorteio } from "../state/hooks/useResultadoDoSorteio"
import Card from "../componentes/Cards"
import './Sorteio.css'

const Sorteio = () => {

    const participantes = useListaDeParticipantes()

    const [participante_da_vez,setParticipanteDaVez] = useState('')
    const [amigoSecreto, setAmigoSecreto] = useState('')

    const resultado = useResultadoDoSorteio()

    const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if(resultado.has(participante_da_vez)){
            setAmigoSecreto(resultado.get(participante_da_vez)!)
        }
    }

    return (<Card>
                <section className="sorteio">
                    <h2>Quem vai tirar o papelzinho?</h2>
                    <form onSubmit={sortear}>
                        <select 
                        required 
                        name="participante_da_vez" 
                        id="participante_da_vez" 
                        value={participante_da_vez} 
                        onChange={evento=>setParticipanteDaVez(evento.target.value)} 
                        placeholder="Selecione o seu nome"
                        >
                            {participantes.map(participante => <option key={participante}>{participante}</option>)}
                        </select>
                        <p>Clique em em sortear para ver quem é seu amigo secreto!</p>
                        <button className="botao-sortear">Sortear</button>
                    </form>
                    {amigoSecreto && <p role="alert">{amigoSecreto}</p>}
                    <footer className="sorteio">
                        <img src="/imagens/aviao.png" className="aviao" alt="Um desenho de um avião de papel" />
                    </footer>
                </section>
            </Card>
    )
}

export default Sorteio