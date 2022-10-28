import React, { useState, useEffect } from 'react'
import {
  ActivityIndicator,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Toast from '../components/Toast'
import { theme } from '../core/theme'
import { getCurrentUserId } from '../api/auth-api'
import BackButton from '../components/BackButton'
import { getEntradasByUser, getEntradasByTeamOwner } from '../api/entrada-api'
import PedidoCard from '../components/PedidoCard'

export default function PedidosListScreen({ route, navigation }) {
  const [loading, setLoading] = useState(0)
  const [error, setError] = useState()
  const [pedidos, setPedidos] = useState([])
  const [fetching, setFetch] = useState(true)
  const [headerMessage, setHeaderMessage] = useState('fix this message')

  const authenticated_UserId = getCurrentUserId()

  // Define if itll show all teams or only the current user ones
  const query_function =
    route.params && route.params.toApprove
      ? getEntradasByTeamOwner
      : getEntradasByUser
  const process_header_message = async () => {
    if (route.params && route.params.toApprove) {
      setHeaderMessage('Pedidos aguardando minha aprovação')
    } else {
      setHeaderMessage('Status de pedidos que eu fiz')
    }
  }

  // fetch pedidos from the database
  useEffect(() => {
    query_function(authenticated_UserId)
      .then((r) => {
        setPedidos(r)
        setFetch(false)
        process_header_message()
        if (r.length == 0) {
          setHeaderMessage('Nenhum pedido aguardando aprovação')
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
          <Logo />
          <Header>{headerMessage}</Header>
          {pedidos.map((pedido, index) => (
            <View key={index}>
              <PedidoCard
                approved={pedido.approved}
                approvingUser={pedido.approvingUser}
                requestingUser={pedido.requestingUser}
                teamId={pedido.teamId}
                doc_id={pedido.doc_id}
                stateChanger={setLoading}
                requestingUserEmail={pedido.requestingUserEmail}
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