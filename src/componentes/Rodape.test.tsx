import { fireEvent, render,screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { useListaDeParticipantes } from '../state/hooks/UseListaDeParticipantes'
import Rodape from './Rodape'

jest.mock('../state/hooks/UseListaDeParticipantes',()=>{
    return{
        useListaDeParticipantes: jest.fn()
    }
})

const mockNavegacao = jest.fn()

jest.mock('react-router-dom',()=>{
    return{
        useNavigate: () => mockNavegacao
    }
})

describe('Onde não existem participantes suficientes',()=>{

    beforeEach(()=>{
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })

    test('o sorteio não pode ser iniciado',()=>{
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        )

        const botao = screen.getByRole('button')
        expect(botao).toBeDisabled()
    })
})

describe('Quando existem participantes',()=>{
    
    const participantes = ['Ana','Catarina','Pedro','Rafael']

    beforeEach(()=>{
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
    })

    test('o sorteio pode ser iniciado',()=>{
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        )
        const botao = screen.getByRole('button')
        expect(botao).not.toBeDisabled()
    })

    test('O sorteio foi iniciado',()=>{
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        )
        const botao = screen.getByRole('button')
        fireEvent.click(botao)
        expect(mockNavegacao).toHaveBeenCalledTimes(1)
        expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
    })
})
