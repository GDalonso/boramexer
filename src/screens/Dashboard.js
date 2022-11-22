import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { logoutUser } from '../api/auth-api'

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Header>Olá</Header>
      <Paragraph>
        Você pode criar um time, pedir para participar e gerenciar pedidos feitos e recebidos.
      </Paragraph>
      <Button mode="outlined" onPress={() => navigation.navigate('TeamScreen')}>
        Criar Time
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('TeamListScreen')}
      >
        Ver todos os times
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('TeamListScreen', { currentUserTeams: true })
        }
      >
        Ver meus times
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('PedidosListScreen', { toApprove: false })
        }
      >
        Meus pedidos de entrada
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('PedidosListScreen', { toApprove: true })
        }
      >
        Aprovar pedidos
      </Button>
      <Button mode="outlined" onPress={logoutUser}>
        Sair
      </Button>
    </Background>
  )
}
