import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, ActivityIndicator } from 'react-native-paper'
import './team_card.css'
import { useNavigation } from '@react-navigation/native'
import Button from './Button'
import { theme } from '../core/theme'
import { getCurrentUserId } from '../api/auth-api'
import { getTeamNameById } from '../api/team-api'
import Toast from './Toast'
import { setEntrada } from '../api/entrada-api'
import Background from './Background'
import { deleteEntradaByUser } from '../api/entrada-api'

export default function PedidoCard({
  approved,
  approvingUser,
  requestingUser,
  teamId,
  doc_id,
  stateChanger, // Number, changing it's value reloads the page
  requestingUserEmail,
}) {
  // Currently Authenticated User
  const authenticated_UserId = getCurrentUserId()

  // Import a navigator for screen redirection
  const navigation = useNavigation()

  const [toast, setToast] = useState({ value: '', type: '' })
  const [blockButton, setBlockButton] = useState(false)
  const [blockApprovalButton, setBlockApprovalButton] = useState(false)
  const [approvalBtnMessage, setApprovalBtnMessage] = useState("Aprovar")

  const [nomeSolicitante, setNomeSolicitante] = useState(requestingUserEmail)
  const [nomeTime, setNomeTime] = useState('carregando')
  const [cadastroPlataforma, setcadastroPlataforma] = useState('carregando')

  const get_readable_data = async () => {
    const nmTime = await getTeamNameById(teamId)
    setNomeTime(nmTime)
    if (approved) {
      setApprovalBtnMessage("Reprovar")
    }
    setcadastroPlataforma('TO BE FETCHED')
  }
  get_readable_data()

  const handle_deletion = async (doc_id, requestingUser) => {
    // Delete my own approval request
    // Disables button while processing
    // no need to reenable after since deletion is a one time operation
    setBlockButton(true)
    const result = await deleteEntradaByUser(doc_id, requestingUser)
    if (stateChanger){
      stateChanger(Math.random())
    }
    setToast({ type: 'success', message: result })
  }

  const handle_approval = async (doc_id, approved, requestingUser) => {
    // Approve or refuse based on current status
    // Disables button after requesting participation
    setBlockApprovalButton(true)
    await setEntrada(approvingUser=authenticated_UserId, teamId=doc_id, approved=!approved, requestingUser=requestingUser)
    if (stateChanger) {
      stateChanger(Math.random())
    }
    setBlockApprovalButton(false)
    setToast({
      type: 'success',
      message: 'Pedido de entrada enviado com sucesso',
    })
  }
  // Loading slider while DB is being queryed
  if (
    nomeSolicitante === 'carregando' ||
    nomeTime === 'carregando' ||
    cadastroPlataforma === 'carregando'
  ) {
    return (
      <Background>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Background>
    )
  }

  return (
    <div className="team_card">
      <Text style={styles.titleText}>{nomeSolicitante}</Text>
      <br />
      <br />
      <Text style={styles.titleText}>{nomeTime}</Text>
      <br />
      <br />
      <Text style={styles.titleText}>Aprovado? {approved? " Sim ": " Não "}</Text>

      {approvingUser === authenticated_UserId && (
        <>
          <Button
            mode="contained"
            onPress={() => handle_approval(doc_id, approved, requestingUser)}
            disabled={blockApprovalButton}
          >
            {approvalBtnMessage}
          </Button>
          <Button
            mode="contained"
            onPress={() => handle_deletion(doc_id, requestingUser)}
            disabled={blockApprovalButton}
          >
            Ignorar
          </Button>
        </>
      )}

      {requestingUser === authenticated_UserId && (
        <>
          <Button
            mode="contained"
            onPress={() => handle_deletion(doc_id, requestingUser)}
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
