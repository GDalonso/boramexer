import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

export default function TeamCard({ nome, descricao, endereco, horario }) {
  return (
    <div>
      <Text style={styles.text}> {nome} </Text>
      <Text style={styles.text}> {descricao} </Text>
      <Text style={styles.text}> {endereco} </Text>
      <Text style={styles.text}> {horario} </Text>
    </div>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
  },
})
