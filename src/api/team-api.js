import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import { getCurrentUserId } from './auth-api'

export const createTeam = async ({ name, descricao, endereco, horario }) => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  // Initialize Realtime Database and get a reference to the service

  try {
    // Initialize Cloud Firestore and get a reference to the service
    const userId = getCurrentUserId()

    const db = firebase.firestore()
    db.collection('times')
      .add({
        name,
        descricao,
        endereco,
        horario,
        userId,
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })

    sleep(200).then(() => {
      console.log(name)
      console.log(descricao)
      console.log(endereco)
      console.log(horario)
    })
    return name // function needs to return something
  } catch (error) {
    return {
      error: error.message,
    }
  }
}
