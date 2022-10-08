export const createTeam = async ({ name, descricao, endereco, horario }) => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  try {
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
