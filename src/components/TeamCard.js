import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Button from './Button'
import { theme } from '../core/theme'
import { getCurrentUserId, getCurrentUserEmail } from '../api/auth-api'
import { deleteTeamsByUser } from '../api/team-api'
import Toast from './Toast'
import {
  setEntrada,
  getIdEntradasByRequestingUserAndTeam,
} from '../api/entrada-api'

export default function TeamCard({
  nome,
  descricao,
  endereco,
  horario,
  doc_UserId, // Usuário que criou o time
  doc_id, // Team id
  stateChanger, // Number, changing it's value reloads the page
}) {
  // Currently Authenticated User
  const authenticated_UserId = getCurrentUserId()

  // Import a navigator for screen redirection
  const navigation = useNavigation()

  const [toast, setToast] = useState({ value: '', type: '' })
  const [blockButton, setBlockButton] = useState(false)
  const [blockPedidoButton, setBlockPedidoButton] = useState(false)
  const [mensagemPedirEntrada, setMensagemPedirEntrada] = useState(
    'Pedir para participar'
  )

  const handle_deletion = async () => {
    // Disables button while processing
    // no need to reenable after since deletion is a one time operation
    setBlockButton(true)
    const result = await deleteTeamsByUser(authenticated_UserId, doc_id)
    setToast({ type: 'success', message: result })
  }

  const handle_pedido_entrada = async (doc_UserId, doc_id) => {
    // Disables button after requesting participation
    setBlockPedidoButton(true)
    await setEntrada(doc_UserId, doc_id)
    setToast({
      type: 'success',
      message: 'Pedido de entrada enviado com sucesso',
    })
  }

  const handle_mensagem_botao_pedido_entrada = async (
    doc_UserId,
    doc_id,
    authenticated_UserId
  ) => {
    if (doc_UserId != authenticated_UserId) {
      const idPedido = await getIdEntradasByRequestingUserAndTeam(
        authenticated_UserId,
        doc_id
      )
      if (idPedido) {
        setBlockPedidoButton(true)
        setMensagemPedirEntrada('Pedido já enviado')
      }
    }
  }
  handle_mensagem_botao_pedido_entrada(doc_UserId, doc_id, authenticated_UserId)

  return (
    <View style={styles.teamCard}>
      <Text style={styles.titleText}>{nome}</Text>
      {/* <br /> */}
      {/* <br /> */}
      <Text style={styles.regularText}> {descricao} </Text>
      {/* <br /> */}
      <Text style={styles.regularText}> {endereco} </Text>
      <Text style={styles.regularText}> {horario} </Text>

      {doc_UserId != authenticated_UserId && (
        <Button
          mode="contained"
          onPress={() => handle_pedido_entrada(doc_UserId, doc_id)}
          disabled={blockPedidoButton}
        >
          {mensagemPedirEntrada}
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
    </View>
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
  teamCard: {
    backgroundColor:  "#F0F0F0",
    marginBottom: "2em",
    paddingVertical: "2em",
    paddingHorizontal: "3em",
    borderRadius: "40",
    overflow: 'hidden',
    elevation: "5",
    boxShadow: "5px 5px 15px #00000014",
    width: "22em",
  },
})
