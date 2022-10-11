import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import { getCurrentUserId } from './auth-api'
import { resultFeedbackAlert } from '../helpers/Alert'

export const setTeam = async ({
  nome,
  descricao,
  endereco,
  horario,
  doc_id = undefined,
}) => {
  try {
    // Initialize Cloud Firestore and get a reference to the service
    const userId = getCurrentUserId()
    const db = firebase.firestore()
    db.collection('times')
      .doc(doc_id) // If doc id is undefined creates a new doc
      .set({
        nome,
        descricao,
        endereco,
        horario,
        userId,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('escreveu com sucesso')
        return { success: 'escreveu com sucesso' }
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
        return { error: 'error' }
      })

    return 'Criado com sucesso' // function needs to return something
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const getTeams = async (_ = null) => {
  try {
    const teams = []

    // Initialize Cloud Firestore and get a reference to the service
    const db = firebase.firestore()

    const collection_reference = db.collection('times')

    await collection_reference
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

export const getTeamsByUser = async (userId) => {
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

export const deleteTeamsByUser = async (userId, doc_id) => {
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
