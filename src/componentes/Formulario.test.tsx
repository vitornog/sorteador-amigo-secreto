import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Formulario from "./Formulario";

test('quando o input está vazio, novos participantes não podem ser adicionados', () => {

    render(
        <RecoilRoot>
            <Formulario />
        </RecoilRoot>
        )

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')

    // encontrar o botão
    const botao = screen.getByRole('button')

    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument()

    // garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled()

})

test('adicionar um participante caso exista um nome preenchido',()=>{
    render(
        <RecoilRoot>
            <Formulario />
        </RecoilRoot>
        )

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')

    // encontrar o botão
    const botao = screen.getByRole('button')

    // inserir valor no input
    fireEvent.change(input,{
        target: {
            value: 'Vovó Juju'
        }
    })
    
    // clicar no botão
    fireEvent.click(botao)

    // garantir que o input seja limpo e dar foco
    expect(input).toHaveFocus()

    // garantir que input esteja vazio
    expect(input).toHaveValue("")

})

test('nomes duplicados não podem ser adicionados na lista',()=>{
    render(
        <RecoilRoot>
            <Formulario />
        </RecoilRoot>
        )

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')

    // encontrar o botão
    const botao = screen.getByRole('button')

    // inserir valor no input
    fireEvent.change(input,{
        target: {
            value: 'Vovó Juju'
        }
    })
    
    // clicar no botão
    fireEvent.click(botao)
    
    // inserir valor no input
    fireEvent.change(input,{
        target: {
            value: 'Vovó Juju'
        }
    })
    
    // clicar no botão
    fireEvent.click(botao)

    const mensagemDeErro = screen.getByRole('alert')
    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')

})