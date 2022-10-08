import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Toast from '../components/Toast'
import TeamCard from '../components/TeamCard'

export default function TeamListScreen({ navigation }) {
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  return (
    <Background>
      <Logo />
      <Header>Times Disponíveis</Header>
      <TeamCard nome="AA" />
      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  )
}
