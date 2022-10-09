import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import './team_card.css'
import Button from './Button'
import { theme } from '../core/theme'

export default function TeamCard({ nome, descricao, endereco, horario }) {
  return (
    <div className="team_card">
      <Text style={styles.titleText}>{nome}</Text>
      <br />
      <br />
      <Text style={styles.regularText}> {descricao} </Text>
      <br />
      <Text style={styles.regularText}> {endereco} </Text>
      <Text style={styles.regularText}> {horario} </Text>
      <Button mode="contained" onPress={() => console.log('aa')}>
        Pedir para participar
      </Button>
    </div>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    color: theme.colors.text,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
  },
  regularText: {
    fontSize: 16,
    color: theme.colors.primary,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
  },
})
