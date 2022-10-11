import React, { useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { nameValidator } from '../helpers/nameValidator'
import { setTeam } from '../api/team-api'
import TextInput from '../components/TextInput'
import Toast from '../components/Toast'

export default function TeamScreen({ route, navigation }) {
  // Sets all the initial values if any existing data was sent
  const nomeInitialValue =
    route.params && route.params.editing ? route.params.nome : ''
  const descricaoInitialValue =
    route.params && route.params.editing ? route.params.descricao : ''
  const enderecoInitialValue =
    route.params && route.params.editing ? route.params.endereco : ''
  const horarioInitialValue =
    route.params && route.params.editing ? route.params.horario : ''
  const doc_id =
    route.params && route.params.editing ? route.params.doc_id : undefined
  // Initialize all the variables for the data
  const [nome, setNome] = useState({ value: nomeInitialValue, error: '' })
  const [descricao, setDescricao] = useState({
    value: descricaoInitialValue,
    error: '',
  })
  const [endereco, setEndereco] = useState({
    value: enderecoInitialValue,
    error: '',
  })
  const [horario, setHorario] = useState({
    value: horarioInitialValue,
    error: '',
  })

  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [toast, setToast] = useState({ value: '', type: '' })

  const create_edit = route.params && route.params.editing ? 'Editar' : 'Criar'

  const onTeamCreatePressed = async () => {
    // field cannot be empty validators for now
    // actual validators still to be implemented
    const nomeError = nameValidator(nome.value)
    const descricaoError = nameValidator(descricao.value)
    const enderecoError = nameValidator(endereco.value)
    const horarioError = nameValidator(horario.value)

    if (nomeError || descricaoError || enderecoError || horarioError) {
      setNome({ ...nome, error: nomeError })
      setDescricao({ ...descricao, error: descricaoError })
      setEndereco({ ...endereco, error: enderecoError })
      setHorario({ ...horario, error: horarioError })
      return
    }
    setLoading(true)
    const response = await setTeam({
      nome: nome.value,
      descricao: descricao.value,
      endereco: endereco.value,
      horario: horario.value,
      doc_id,
    }).then((r) => {
      setToast({ type: 'success', message: 'Time criado com sucesso' })
    })

    setLoading(false)
  }

  return (
    <Background>
      <Logo />
      <Header>{create_edit} seu time</Header>
      <TextInput
        label="Nome"
        returnKeyType="next"
        value={nome.value}
        onChangeText={(text) => setNome({ value: text, error: '' })}
        error={!!nome.error}
        errorText={nome.error}
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
        {create_edit}
      </Button>
      <Toast
        {...toast}
        onDismiss={() => navigation.navigate('TeamListScreen')}
      />
    </Background>
  )
}
