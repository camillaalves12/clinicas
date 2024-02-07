import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { DocumentReportHeader } from '../DocumentReportHeader/DocumentReportHeader'
import { api } from '../../services/api'
import { useState } from 'react'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

export function DocumentReport(props) {
  const [dailyData, setDailyData] = useState(null)

  const getClinicId = () => {
    const userDataString = localStorage.getItem('user')
    const userData = JSON.parse(userDataString)
    const clinicId = userData?.user?.clinicaId
    return clinicId
  }

  const fetchDailyData = async () => {
    const day = props.day

    try {
      const response = await api.put(`/dailyData/${getClinicId()}`, {
        data: day
      })
      setDailyData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const reportSection = () => {
    if (props.reportType === 'day') {
      const dailyData = fetchDailyData()
      return (
        <View>
          {dailyData && (
            <View style={styles.section}>
              <Text>Dia: {dailyData.dia}</Text>
              <Text>Clínica: {dailyData.clinica}</Text>
              <Text>Total de Consultas: {dailyData.total_de_consultas}</Text>
              <Text>Valor Total: {dailyData.valor_total}</Text>
              {dailyData.valor_por_profissional.map((prof, index) => (
                <View key={index}>
                  <Text>Profissional: {prof.profissional}</Text>
                  <Text>Número de Consultas: {prof.numberOfConsults}</Text>
                  <Text>Valor Total: {prof.totalValue}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <DocumentReportHeader
            reportType={'day'}
            clinicName={'Teste'}
            user={'Usuário teste'}
            initialDate={'2024-02-01'}
            finalDate={'2024-02-29'}
            day={'2024-02-01'}
            month={'02'}
            year={'2024'}
          />
        </View>
        <View style={styles.section}>
          {reportSection()}
        </View>
      </Page>
    </Document>
  )
}
