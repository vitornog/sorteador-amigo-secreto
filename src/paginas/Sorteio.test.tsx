import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import { useResultadoDoSorteio } from "../state/hooks/useResultadoDoSorteio";
import Sorteio from "./Sorteio";

jest.mock('../state/hooks/useListaDeParticipantes',()=>{
    return{
        useListaDeParticipantes: jest.fn()
    }
})

jest.mock('../state/hooks/useResultadoDoSorteio',()=>{
    return{
        useResultadoDoSorteio: jest.fn()
    }
})

describe('Página de Sorteio',()=>{

    const participantes = ['Ana','Catarina','Pedro','Rafael']
    
    const resultado = new Map([['Ana','Pedro'],['Catarina','Rafael'],['Rafael','Ana'],['Pedro','Catarina']])

    beforeEach(()=>{
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
        (useResultadoDoSorteio as jest.Mock).mockReturnValue(resultado);
    })


    test('Todos os participantes podem exibir o seu amigo secreto',()=>{
        render(<RecoilRoot>
                <Sorteio />
            </RecoilRoot>)

        const opcoes = screen.queryAllByRole('option')
        expect(opcoes).toHaveLength(participantes.length)
    })

    test('O amigo secreto é exibido quando solicitado',()=>{
         render(<RecoilRoot>
                <Sorteio />
            </RecoilRoot>)

            const select = screen.getByPlaceholderText('Selecione o seu nome')

            fireEvent.change(select,{
                target: {
                    value: participantes[0]
                }
            })

            const botao = screen.getByRole('button')
            fireEvent.click(botao)

            const amigoSecreto = screen.getByRole('alert')
            expect(amigoSecreto).toBeInTheDocument()
    })
})