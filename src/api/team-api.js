import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
// import firebase from 'firebase/app'

export const createTeam = async ({ name, descricao, endereco, horario }) => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  // Initialize Realtime Database and get a reference to the service

  try {
    // const app =
    //   getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp()
    // const database = getDatabase(app)
    const database = getDatabase()
    // firebase.database().ref('times/1').set({
    //   name,
    //   descricao,
    //   endereco,
    //   horario,
    // })

    set(ref(database, 'times/1'), {
      name,
      descricao,
      endereco,
      horario,
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
