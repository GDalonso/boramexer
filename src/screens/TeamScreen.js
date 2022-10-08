import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { nameValidator } from '../helpers/nameValidator'
import { createTeam } from '../api/team-api'
import TextInput from '../components/TextInput'

export default function TeamScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [descricao, setDescricao] = useState({ value: '', error: '' })

  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  const onTeamCreatePressed = async () => {
    const nameError = nameValidator(name.value)
    const descricaoError = nameValidator(descricao.value)
    if (nameError || descricaoError) {
      setName({ ...name, error: nameError })
      setDescricao({ ...descricao, error: descricaoError })
      return
    }
    setLoading(true)
    const response = await createTeam({
      name: name.value,
      descricao: descricao.value,
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
        label="Descricao"
        returnKeyType="next"
        value={descricao.value}
        onChangeText={(text) => setDescricao({ value: text, error: '' })}
        error={!!descricao.error}
        errorText={descricao.error}
      />
      <Button mode="outlined" onPress={onTeamCreatePressed}>
        Criar Time
      </Button>
    </Background>
  )
}
