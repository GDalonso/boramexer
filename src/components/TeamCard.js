import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import './team_card.css'
import Button from './Button'
import { theme } from '../core/theme'
import { getCurrentUserId } from '../api/auth-api'

export default function TeamCard({
  nome,
  descricao,
  endereco,
  horario,
  doc_UserId,
}) {
  const authenticated_UserId = getCurrentUserId()
  return (
    <div className="team_card">
      <Text style={styles.titleText}>{nome}</Text>
      <br />
      <br />
      <Text style={styles.regularText}> {descricao} </Text>
      <br />
      <Text style={styles.regularText}> {endereco} </Text>
      <Text style={styles.regularText}> {horario} </Text>

      {doc_UserId != authenticated_UserId && (
        <Button
          mode="contained"
          onPress={() => console.log('Pedir para participar')}
        >
          Pedir para participar
        </Button>
      )}

      {doc_UserId == authenticated_UserId && (
        <>
          <Button mode="contained" onPress={() => console.log('Editar')}>
            Editar
          </Button>
          <Button mode="contained" onPress={() => console.log('Desfazer time')}>
            Desfazer Time
          </Button>
        </>
      )}
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
