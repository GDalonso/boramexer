import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Text } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Toast from '../components/Toast'
import TeamCard from '../components/TeamCard'
import { getTeams } from '../api/team-api'
import { theme } from '../core/theme'

export default function TeamListScreen({ navigation }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [times, setTeams] = useState([])

  useEffect(() => {
    setLoading(true)
    getTeams()
      .then((r) => {
        setTeams(r)
      })
      .catch((e) => {
        setError(e)
        console.log(e)
        throw e
      })
  }, [])

  if (!times.length > 0) {
    return (
      <Background>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Background>
    )
  }

  return (
    <Background>
      <Logo />
      <Header>Times Disponíveis</Header>
      {times.map((time, index) => (
        <div key={index}>
          <TeamCard
            nome={time.nome}
            descricao={time.descricao}
            endereco={time.endereco}
            horario={time.horario}
            doc_UserId={time.userId}
          />
        </div>
      ))}

      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  )
}
