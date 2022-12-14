import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import { getCurrentUserId } from './auth-api'

export const setTeam = async ({
  nome,
  descricao,
  endereco,
  horario,
  doc_id = undefined,
}) => {
  // Initialize Cloud Firestore and get a reference to the service
  const userId = getCurrentUserId()
  const db = firebase.firestore()
  await db
    .collection('times')
    .doc(doc_id) // If doc id is undefined creates a new doc
    .set({
      nome,
      descricao,
      endereco,
      horario,
      userId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((r) => {})
    .catch((error) => {
      console.error('Error adding document: ', error)
      throw error
    })
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

export const getTeamNameById = async (teamId) => {
  try {
    // Initialize Cloud Firestore and get a reference to the service
    const db = firebase.firestore()
    let nome = ""
    if (!teamId) {
      console.log('Provide Team id')
      return {
        error: 'Provide an Team id',
      }
    }
    const docref = db.collection('times').doc(teamId)
    await docref
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data()
          nome = data.nome
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
    return nome
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
