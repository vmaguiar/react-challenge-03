/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/


import { useState } from "react";



function App() {

  const [data, setData] = useState({
    fullName: '',
    //dogName: '',
    email: '',
    maritalStatus: '',
    gender: ''
  })


  const handleOnChange = (event) => {
    const {value, name} = event.target

    setData((oldData) => {
      const newData = {...data, [name]: value}
      return newData
    })
  }

  const handleOnClick = () => {
    alert('Formulário enviado com sucesso')

    setData({
      fullName: '',
      //dogName: '',
      email: '',
      maritalStatus: '',
      gender: ''
    })
  }

  const calculateBarProgress = () => {
    //pegar os elementos do objeto data (feature do < ECS6)
    const dataElements = Object.keys(data)

    //numero total de elementos do objeto
    const totalElements = dataElements.length

    //contador de elementos preenchidos
    let filledElements = 0

    //loop para percorrer cada elemento e verificar se ta vazio ou preenchido
    dataElements.forEach((element) => {
      if(data[element]) {
        //para os casos que precisam de validação há um case, se não segue o padrão
        switch(element){
          case 'fullName':
            const explodeString = data[element].split(' ')
            if(explodeString[1]) {
              filledElements++
              break
            }
            break
          
          case 'email':
            let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(regex.test(data[element])) {
              filledElements++
              break
            }
            break

          default:
            filledElements++
        }
      }
    })
    //retornando o valor em porcentagem de elementos preenchidos
    return((filledElements/totalElements)*100)
  }

  return (
    <div className='App'>
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div className="bar" style={{width: `${calculateBarProgress()}%`}} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>Nome Completo</label>
          <input
            name="fullName"
            value={data.fullName}
            onChange={handleOnChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>E-mail</label>
          <input
            name="email"
            value={data.email}
            onChange={handleOnChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>Estado Civil</label>
          <select
            name="maritalStatus"
            value={data.maritalStatus}
            onChange={handleOnChange}
          >
            <option value=''>- selecione...</option>
            <option value='solteiro'>Solteiro</option>
            <option value='casado'>Casado</option>
            <option value='divorciado'>Divorciado</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input
                type='radio'
                name="gender"
                value="masculino"
                onChange={handleOnChange}
                checked={data.gender === "masculino"}
              /> Masculino
            </span>
            <span>
              <input
                type='radio'
                name="gender"
                value="feminino"
                onChange={handleOnChange}
                checked={data.gender === "feminino"} 
              /> Feminino
            </span>
          </div>
        </div>
        <button
          onClick={handleOnClick}
          disabled={calculateBarProgress() < 100}
        >
          Enviar Formulário
        </button>
      </main>
    </div>
  );
}

export default App;
