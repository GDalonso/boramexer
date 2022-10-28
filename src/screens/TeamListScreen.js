import React, { useState, useEffect } from 'react'
import {
  ActivityIndicator,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native'
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
  const [fetching, setFetch] = useState(true)
  const [headerMessage, setHeaderMessage] = useState('fix this message')


  const authenticated_UserId = getCurrentUserId()

  // Define if itll show all teams or only the current user ones
  const query_function =
    route.params && route.params.currentUserTeams ? getTeamsByUser : getTeams
  
    const process_header_message = async () => {
    if (route.params && route.params.currentUserTeams) {
      setHeaderMessage('Seus Times')
    } else {
      setHeaderMessage('Times disponíveis')
    }
  }

  // fetch teams from the database
  useEffect(() => {
    query_function(authenticated_UserId)
      .then((r) => {
        setTeams(r)
        setFetch(false)
        process_header_message()
        if (r.length == 0) {
          setHeaderMessage('Crie seu primeiro time!')
        }
      })
      .catch((e) => {
        setError(e)
        console.log(e)
        throw e
      })
  }, [loading])

  // Loading slider while DB is being queryed
  if (fetching) {
    return (
      <Background>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Background>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Background>
        <ScrollView style={styles.container}>
          <BackButton goBack={navigation.goBack} />
          <Header>{headerMessage}</Header>
          {times.map((time, index) => (
            <View key={index}>
              <TeamCard
                nome={time.nome}
                descricao={time.descricao}
                endereco={time.endereco}
                horario={time.horario}
                doc_UserId={time.userId}
                doc_id={time.doc_id}
                stateChanger={setLoading}
              />
            </View>
          ))}

          <Toast message={error} onDismiss={() => setError('')} />
        </ScrollView>
      </Background>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
})
