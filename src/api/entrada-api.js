import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import { getCurrentUserId, getCurrentUserEmail } from './auth-api'
import { resultFeedbackAlert } from '../helpers/Alert'

export const setEntrada = async (
  approvingUser,
  teamId,
  approved = false,
  requestingUserId = null
) => {
  // Initialize Cloud Firestore and get a reference to the service

  const requestingUser = requestingUserId || getCurrentUserId()
  const db = firebase.firestore()
  await db
    .collection('entradas')
    .doc(teamId) // If doc id is undefined creates a new doc
    .set({
      teamId,
      approvingUser,
      requestingUser,
      approved,
      requestingUserEmail: getCurrentUserEmail(),
      created: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((r) => {})
    .catch((error) => {
      console.error('Error adding document: ', error)
      throw error
    })
}

export const getEntradasByUser = async (userId) => {
  // Pedidos feitos por este user
  try {
    const pedidos = []

    // Initialize Cloud Firestore and get a reference to the service
    const db = firebase.firestore()

    if (!userId) {
      console.log('Provide user id')
      return {
        error: 'Provide an user id',
      }
    }
    await db
      .collection('entradas')
      .where('requestingUser', '==', userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          pedidos.push({ ...doc.data(), doc_id: doc.id })
        })
      })
      .catch((error) => {
        console.error('Error fetching documents: ', error)
      })
    return pedidos
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const getEntradasByTeamOwner = async (userId) => {
  // Pedidos feitos por este user
  try {
    const pedidos = []

    // Initialize Cloud Firestore and get a reference to the service
    const db = firebase.firestore()

    if (!userId) {
      console.log('Provide user id')
      return {
        error: 'Provide an user id',
      }
    }
    await db
      .collection('entradas')
      .where('approvingUser', '==', userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          pedidos.push({ ...doc.data(), doc_id: doc.id })
        })
      })
      .catch((error) => {
        console.error('Error fetching documents: ', error)
      })
    return pedidos
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const deleteEntradaByUser = async (pedidoId, requestingUser) => {
  try {
    // Initialize Cloud Firestore and get a reference to the service
    const db = firebase.firestore()
    const currently_authenticated_userId = getCurrentUserId()

    if (!pedidoId) {
      console.log('Provide a pedido id')
      return {
        error: 'Provide a pedido id',
      }
    }

    await db
      .collection('entradas')
      .doc(pedidoId)
      .delete()
      .then()
      .catch((error) => {
        console.error('Error fetching documents: ', error)
      })
    return 'Deletado com sucesso'
  } catch (error) {
    return {
      error: error.message,
    }
  }
}
