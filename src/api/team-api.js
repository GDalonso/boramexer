import firebase from 'firebase/app'
import 'firebase/database'

export const createTeam = async ({ name, descricao, endereco, horario }) => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  // Initialize Realtime Database and get a reference to the service

  try {
    const response = firebase
      .database()
      .ref('times/11')
      .set(
        {
          name,
          descricao,
          endereco,
          horario,
        },
        (error) => {
          if (error) {
            // The write failed...
            console.log(error)
          } else {
            // Data saved successfully!
            console.log('data saved successfully')
          }
        }
      )

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
