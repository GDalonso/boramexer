import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import { getCurrentUserId } from './auth-api'
import { resultFeedbackAlert } from '../helpers/Alert'

export const setEntrada = async (
  approvingUser,
  teamId,
) => {
    console.log(approvingUser)
    console.log(teamId)
// Initialize Cloud Firestore and get a reference to the service
  const requestingUser = getCurrentUserId()
  const db = firebase.firestore()
  await db.collection('entradas')
    .doc(teamId) // If doc id is undefined creates a new doc
    .set({
      teamId,
      approvingUser,
      requestingUser,
      approved: false,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((r) => {
      
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
      throw error
    })
}

export const getEntradasByUser = async (userId) => {
  try {
    const teams = []

    // Initialize Cloud Firestore and get a reference to the service
    const db = firebase.firestore()

    if (!userId) {
      console.log('Provide user id')
      return {
        error: 'Provide an user id',
      }
    }
    await db
      .collection('times')
      .where('userId', '==', userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          teams.push({ ...doc.data(), doc_id: doc.id })
        })
      })
      .catch((error) => {
        console.error('Error fetching documents: ', error)
      })
    return teams
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const getEntradasByTeams = async (userId) => {
    try {
      const teams = []
  
      // Initialize Cloud Firestore and get a reference to the service
      const db = firebase.firestore()
  
      if (!userId) {
        console.log('Provide user id')
        return {
          error: 'Provide an user id',
        }
      }
      await db
        .collection('times')
        .where('userId', '==', userId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            teams.push({ ...doc.data(), doc_id: doc.id })
          })
        })
        .catch((error) => {
          console.error('Error fetching documents: ', error)
        })
      return teams
    } catch (error) {
      return {
        error: error.message,
      }
    }
  }

export const deleteEntradaByUser = async (userId, doc_id) => {
  try {
    // Initialize Cloud Firestore and get a reference to the service
    const db = firebase.firestore()
    const currently_authenticated_userId = getCurrentUserId()
    console.log('deleting: ' + doc_id)

    if (!userId) {
      console.log('Provide user id')
      return {
        error: 'Provide an user id',
      }
    }
    if (userId != currently_authenticated_userId) {
      console.log('cant delete other peoples teams')
      return {
        error: 'cant delete other peoples teams',
      }
    }
    await db
      .collection('times')
      .doc(doc_id)
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
