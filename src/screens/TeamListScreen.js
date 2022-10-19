import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Text } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Toast from '../components/Toast'
import TeamCard from '../components/TeamCard'
import { getTeams, getTeamsByUser } from '../api/team-api'
import { theme } from '../core/theme'
import { getCurrentUserId } from '../api/auth-api'
import BackButton from '../components/BackButton'

export default function TeamListScreen({ route, navigation }) {
  const [loading, setLoading] = useState(0)
  const [error, setError] = useState()
  const [times, setTeams] = useState([])

  const authenticated_UserId = getCurrentUserId()

  // Define if itll show all teams or only the current user ones
  const query_function =
    route.params && route.params.currentUserTeams ? getTeamsByUser : getTeams

  // fetch teams from the database
  useEffect(() => {
    query_function(authenticated_UserId)
      .then((r) => {
        setTeams(r)
      })
      .catch((e) => {
        setError(e)
        console.log(e)
        throw e
      })
  }, [loading])

  // Loading slider while DB is being queryed
  if (!times.length > 0) {
    return (
      <Background>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Background>
    )
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
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
            doc_id={time.doc_id}
            stateChanger={setLoading}
          />
        </div>
      ))}

      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  )
}
