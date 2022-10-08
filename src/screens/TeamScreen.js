import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { nameValidator } from '../helpers/nameValidator'
import { createTeam } from '../api/team-api'
import TextInput from '../components/TextInput'
import Toast from '../components/Toast'

export default function TeamScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [descricao, setDescricao] = useState({ value: '', error: '' })
  const [endereco, setEndereco] = useState({ value: '', error: '' })
  const [horario, setHorario] = useState({ value: '', error: '' })

  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  const onTeamCreatePressed = async () => {
    // field cannot be empty validators for now
    // actual validators still to be implemented
    const nameError = nameValidator(name.value)
    const descricaoError = nameValidator(descricao.value)
    const enderecoError = nameValidator(endereco.value)
    const horarioError = nameValidator(horario.value)

    if (nameError || descricaoError || enderecoError || horarioError) {
      setName({ ...name, error: nameError })
      setDescricao({ ...descricao, error: descricaoError })
      setEndereco({ ...endereco, error: enderecoError })
      setHorario({ ...horario, error: horarioError })
      return
    }
    setLoading(true)
    const response = await createTeam({
      name: name.value,
      descricao: descricao.value,
      endereco: endereco.value,
      horario: horario.value,
    })
    if (response.error) {
      setError(response.error)
    }
    setLoading(false)
  }

  return (
    <Background>
      <Logo />
      <Header>Criar um time</Header>
      <TextInput
        label="Nome"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Descrição"
        returnKeyType="next"
        value={descricao.value}
        onChangeText={(text) => setDescricao({ value: text, error: '' })}
        error={!!descricao.error}
        errorText={descricao.error}
      />
      <TextInput
        label="Endereço"
        returnKeyType="next"
        value={endereco.value}
        onChangeText={(text) => setEndereco({ value: text, error: '' })}
        error={!!endereco.error}
        errorText={endereco.error}
      />
      <TextInput
        label="Horário"
        returnKeyType="next"
        value={horario.value}
        onChangeText={(text) => setHorario({ value: text, error: '' })}
        error={!!horario.error}
        errorText={horario.error}
      />
      <Button mode="outlined" loading={loading} onPress={onTeamCreatePressed}>
        Criar Time
      </Button>
      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  )
}