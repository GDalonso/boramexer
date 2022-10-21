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
import { setEntrada } from '../api/entrada-api'

export default function PedidoCard({
  approved,
  approvingUser,
  requestingUser,
  teamId,
  doc_id,
  stateChanger, // Number, changing it's value reloads the page
}) {
  // Currently Authenticated User
  const authenticated_UserId = getCurrentUserId()

  // Import a navigator for screen redirection
  const navigation = useNavigation()

  const [toast, setToast] = useState({ value: '', type: '' })
  const [blockButton, setBlockButton] = useState(false)
  const [blockApprovalButton, setBlockApprovalButton] = useState(false)

  const nomeSolicitante = "TO BE FETCHED"
  const nomeTime = "TO BE FETCHED"
  const cadastroPlataforma = "TO BE FETCHED"
  
  if (approved){
    const approvalBtnMessage = "Pedido já aprovado"
    setBlockApprovalButton(approved)
  } else {
    const approvalBtnMessage = "Pedido ainda não aprovado"
  }

  const handle_deletion = async () => {
    //Delete my own approval request
    //Disables button while processing
    //no need to reenable after since deletion is a one time operation
    setBlockButton(true) 
    // const result = await deleteTeamsByUser(authenticated_UserId, doc_id)
    // setToast({ type: 'success', message: result })
  }

  const handle_approval = async (doc_id, approved) => {
    //Approve or refuse
    //Disables button after requesting participation
    setBlockApprovalButton(true) 
    // await setEntrada(doc_UserId, doc_id)
    setToast({ type: 'success', message: "Pedido de entrada enviado com sucesso" })
  }

  return (
    <div className="team_card">
      <Text style={styles.titleText}>{nomeSolicitante}</Text>
      <br />
      <br />
      <Text style={styles.regularText}> {nomeTime} </Text>
      <br />
      <Text style={styles.regularText}> {cadastroPlataforma} </Text>

      {approvingUser === authenticated_UserId && (
        <>
        <Button
          mode="contained"
          onPress={() => handle_approval(doc_id, true)}
          disabled={blockApprovalButton}
        >
          Aprovar
        </Button>
        <br />
        <Button
          mode="contained"
          onPress={() => handle_approval(doc_id, false)}
          disabled={blockApprovalButton}
        >
          Reprovar
        </Button>
        </>
      )}

      {requestingUser === authenticated_UserId && (
        <>
          <Button
            mode="contained"
            onPress={handle_deletion}
            disabled={blockButton}
          >
            Retirar participação
          </Button>
          {/* do nothing on toast dismiss */}
        </>
      )}
    <Toast {...toast} onDismiss={() => 1 + 1} />
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
