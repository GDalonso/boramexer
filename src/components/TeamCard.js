import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import './team_card.css'
import { useNavigation } from '@react-navigation/native'
import Button from './Button'
import { theme } from '../core/theme'
import { getCurrentUserId } from '../api/auth-api'
import { deleteTeamsByUser } from '../api/team-api'
import Toast from './Toast'

export default function TeamCard({
  nome,
  descricao,
  endereco,
  horario,
  doc_UserId,
  doc_id,
  stateChanger, // Number, changing it's value reloads the page
}) {
  // Currently Authenticated User
  const authenticated_UserId = getCurrentUserId()

  // Import a navigator for screen redirection
  const navigation = useNavigation()

  const [toast, setToast] = useState({ value: '', type: '' })
  const [blockButton, setBlockButton] = useState(false)

  const handle_deletion = async () => {
    setBlockButton(true) //no need to reenable after since deletion is a one time operation
    const result = await deleteTeamsByUser(authenticated_UserId, doc_id)
    setToast({ type: 'success', message: result })
    stateChanger(Math.random())
  }

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
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate('TeamScreen', {
                editing: true,
                nome,
                descricao,
                endereco,
                horario,
                doc_id,
                stateChanger, // this raises a warning
              })
            }
          >
            Editar
          </Button>
          <Button
            mode="contained"
            onPress={handle_deletion}
            disabled={blockButton}
          >
            Desfazer Time
          </Button>
          {/* do nothing on toast dismiss */}
          <Toast {...toast} onDismiss={() => 1 + 1} />
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
