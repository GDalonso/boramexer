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
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button mode="outlined" onPress={() => navigation.navigate('TeamScreen')}>
        Criar Time
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('TeamListScreen')}
      >
        See all teams available
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('TeamListScreen', { currentUserTeams: true })
        }
      >
        See your teams
      </Button>
      <Button mode="outlined" onPress={logoutUser}>
        Logout
      </Button>
    </Background>
  )
}
