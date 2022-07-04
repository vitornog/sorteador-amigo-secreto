import React from "react";
import { realizarSorteio } from "../realizarSorteio";

describe('Dado um determinado sorteio',()=>{
    test('Cada participante não sorteie a si mesmo',()=>{

        const participantes = ['Ana','Catarina','Pedro','Rafael','Juju','João']

        const sorteio = realizarSorteio(participantes)

        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
    })
})