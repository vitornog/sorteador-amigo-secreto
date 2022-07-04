import { render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { useListaDeParticipantes } from '../state/hooks/UseListaDeParticipantes'
import ListaParticipantes from './ListaParticipantes'

jest.mock('../state/hooks/UseListaDeParticipantes',()=>{
    return{
        useListaDeParticipantes: jest.fn()
    }
})

describe('Uma lista vazia de participantes',()=>{
    
    beforeEach(()=>{
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })

    test('Deve ser renderizada sem elementos',() => {
        render(
            <RecoilRoot>
                <ListaParticipantes />
            </RecoilRoot>
        )

        const itens = screen.queryAllByRole('listitem')
        expect(itens).toHaveLength(0)
    })

    test('Uma lista preenchida de participantes',() => {
        const participantes = ['Ana','Catarina']
        
        beforeEach(()=>{
            (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
        })

        render(
            <RecoilRoot>
                <ListaParticipantes />
            </RecoilRoot>
        )

        const itens = screen.queryAllByRole('listitem')
        expect(itens).toHaveLength(participantes.length)
    })
})