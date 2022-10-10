import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import { getCurrentUserId } from './auth-api'
import { resultFeedbackAlert } from '../helpers/Alert'

export const createTeam = async ({ nome, descricao, endereco, horario }) => {
  try {
    // Initialize Cloud Firestore and get a reference to the service
    const userId = getCurrentUserId()

    const db = firebase.firestore()
    db.collection('times')
      .add({
        nome,
        descricao,
        endereco,
        horario,
        userId,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
        resultFeedbackAlert('Criação de time', 'Sucesso')
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })

    return nome // function needs to return something
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const getTeams = async (_=null) => {
  try {
    const teams = []

    // Initialize Cloud Firestore and get a reference to the service
    const db = firebase.firestore()

    const collection_reference = db.collection('times')

    await collection_reference
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          teams.push(doc.data())
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
      console.log("Provide user id")
      return {
        error: "Provide an user id"
      }
    }
    await db
      .collection('times')
      .where('userId', '==', userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          teams.push(doc.data())
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
